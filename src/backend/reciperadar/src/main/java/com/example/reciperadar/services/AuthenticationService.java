package com.example.reciperadar.services;

import com.example.reciperadar.dto.LoginUserDto;
import com.example.reciperadar.dto.RegisterUserDto;
import com.example.reciperadar.dto.VerifyUserDto;
import com.example.reciperadar.entities.User;
import com.example.reciperadar.repositories.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthenticationService(UserRepository userRepository,
                                 PasswordEncoder passwordEncoder,
                                 AuthenticationManager authenticationManager,
                                 EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }
    public User signup(RegisterUserDto input){
        User user = new User(input.getUsername(), input.getEmail(),passwordEncoder.encode(input.getPassword()));
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(false);
        sendVerificationEmail(user);
        return userRepository.save(user);
    }
    public User authenticate(LoginUserDto input){
        User user = userRepository.findByEmail(input.getEmail()).orElseThrow(()->new RuntimeException("User not found"));

        if(!user.isEnabled()){
            throw new RuntimeException("Account not verified, please verify account");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
        return user;


    }
    public void verifyUser(VerifyUserDto input){
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())){
                throw new RuntimeException("Verification code has expired");
            }
            if(user.getVerificationCode().equals(input.getVerificationCode())){
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiresAt(null);
                userRepository.save(user);
            }
            else{
                throw new RuntimeException("invalid verification code");
            }
        }
        else{
            throw new RuntimeException("user not found");
        }

    }
    public void resendVerificationCode(String email){
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(user.isEnabled()){
                throw new RuntimeException("User already verified");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
            sendVerificationEmail(user);
            userRepository.save(user);
        }
        else{
            throw new RuntimeException("user not found");
        }
    }
    public void sendVerificationEmail(User user){
        String subject = "Account Verification";
        String verificationCode = user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<head>"
                + "<style>"
                + "body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }"
                + ".container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; }"
                + ".header { text-align: center; color: #333; }"
                + ".content { background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); margin-top: 20px; }"
                + ".verification-code { font-size: 24px; font-weight: bold; color: #007bff; text-align: center; padding: 10px; border: 2px dashed #007bff; border-radius: 5px; }"
                + ".footer { text-align: center; font-size: 14px; color: #777; margin-top: 20px; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class=\"container\">"
                + "<h2 class=\"header\">Welcome to Our App!</h2>"
                + "<p style=\"font-size: 16px; text-align: center;\">Please enter the verification code below to continue:</p>"
                + "<div class=\"content\">"
                + "<h3 class=\"header\">Verification Code:</h3>"
                + "<p class=\"verification-code\">" + verificationCode + "</p>"
                + "</div>"
                + "<div class=\"footer\">"
                + "<p>Thank you for joining us!</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";


        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        }
        catch (MessagingException e) {
            // Handle email sending exception
            e.printStackTrace();
        }
    }
    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000)+100000;
        return String.valueOf(code);
    }
}
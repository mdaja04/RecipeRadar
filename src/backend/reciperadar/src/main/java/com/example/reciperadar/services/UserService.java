package com.example.reciperadar.services;

import com.example.reciperadar.entities.User;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.example.reciperadar.repositories.UserRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers(){
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public void addNewUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()){
            throw new IllegalStateException("Email already in use");
        }
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        boolean userExists = userRepository.existsById(userId);
        if(!userExists){
            throw new IllegalStateException(
                    "User with id " + userId + " does not exist"
            );
        }
        userRepository.deleteById(userId);

    }

    @Transactional
    public void updateUser(Long userId, String name, String username, String email, String surname, String profileImageURL, Boolean publicProfile, LocalDate dob) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalStateException("user with id " + userId + " doesn't exist"));

        if (name != null && !name.isEmpty() && !Objects.equals(user.getName(),name)){
            user.setName(name);
        }

        if (surname != null && !surname.isEmpty() && !Objects.equals(user.getSurname(),surname)){
            user.setSurname(surname);
        }

        if (email != null && !email.isEmpty() && !Objects.equals(user.getEmail(),email)){
            Optional<User> existingUser = userRepository.findByEmail(email);
            if (existingUser.isPresent()){
                throw new IllegalStateException("Email is already in use");
            }
            user.setEmail(email);
        }
        if (username != null && !username.isEmpty() && !Objects.equals(user.getUsername(),username)){
            Optional<User> existingUser = userRepository.findByUsername(username);
            if (existingUser.isPresent()){
                throw new IllegalStateException("Username is already in use");
            }
            user.setUsername(username);
        }
        if (profileImageURL != null && !profileImageURL.isEmpty() && !Objects.equals(user.getProfileImageUrl(),profileImageURL)){
            user.setProfileImageUrl(profileImageURL);
        }

        if(publicProfile!=null){
            user.setPublicProfile(publicProfile);
        }

        if (dob != null) {
            user.setDob(dob);
        }

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Attempting to load user by username: " + username);

        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isEmpty()) {
            System.out.println("User not found in database for username: " + username);
            throw new UsernameNotFoundException("User with username " + username + " not found");
        }

        User user = userOptional.get();
        System.out.println("User successfully loaded from database: " + user.getUsername());

        return user;
    }



    public Long getUserIdByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        return user.getId();
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }
}

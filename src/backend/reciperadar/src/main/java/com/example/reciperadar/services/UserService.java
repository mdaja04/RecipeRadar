package com.example.reciperadar.services;

import com.example.reciperadar.dto.UserUpdateDto;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();
        System.out.println("Fetched users: " + users);  // Add logging
        userRepository.findAll().forEach(users::add);
        return users;
    }


    public void updateUser(UserUpdateDto userUpdateDto) throws IOException {
        User user = userRepository.findByUsername(userUpdateDto.getUsername())
                .orElseThrow(() -> new IllegalStateException("User not found"));

        if (userUpdateDto.getName() != null) user.setName(userUpdateDto.getName());
        if (userUpdateDto.getSurname() != null) user.setSurname(userUpdateDto.getSurname());
        if (userUpdateDto.getImage() != null) user.setImage(userUpdateDto.getImage().getBytes());
        if (userUpdateDto.getPublicProfile() != null) user.setPublicProfile(userUpdateDto.getPublicProfile());

        userRepository.save(user);
    }

    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(()->new IllegalStateException("User not found"));
        userRepository.delete(user);
    }

    public User findUser(String username) {
        return userRepository.findByUsername(username).orElseThrow(()->new IllegalStateException("user not found"));
    }
}

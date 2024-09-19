package com.example.reciperadar.repositories;

import com.example.reciperadar.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    //Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);

}

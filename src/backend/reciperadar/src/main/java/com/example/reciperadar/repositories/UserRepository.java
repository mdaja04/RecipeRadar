package com.example.reciperadar.repositories;

import com.example.reciperadar.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, Long> {

    //Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);


    Optional<User> findByUsername(String username);

    Optional<User> findByVerificationCode(String verificationCode);

}

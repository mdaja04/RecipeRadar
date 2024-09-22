package com.example.reciperadar.entities;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.time.Period;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.time.LocalDate;

@Getter
@Setter
@EqualsAndHashCode


@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long id;
    @Column(unique = true,nullable = false)
    private String username;
    private String name;
    private String surname;
    @Column(unique = true,nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    private LocalDate dob;

    @Transient
    private Integer age;
    private String profileImageUrl;
    private Boolean publicProfile;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    private boolean locked;

    private boolean enabled;

    @Column(name="verification_code")
    private String verificationCode;

    @Column(name="verification_expiration")
    private LocalDateTime verificationCodeExpiresAt;




    public User(String username, String name, String surname, String email, String password, LocalDate dob, String profileImageUrl, Boolean publicProfile, UserRole userRole, boolean locked, boolean enabled) {
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.dob = dob;
        this.profileImageUrl = profileImageUrl;
        this.publicProfile = publicProfile;
        this.userRole = userRole;
        this.locked = locked;
        this.enabled = enabled;
    }

    public User() {
    }

    public User(String username, String email, String encode) {
        this.username = username;
        this.email = email;
        this.password = encode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userRole.name());
        return Collections.singletonList(authority);
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Integer getAge() {
        return Period.between(this.dob,LocalDate.now()).getYears();
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public Boolean getPublicProfile() {
        return publicProfile;
    }

    public void setPublicProfile(Boolean publicProfile) {
        this.publicProfile = publicProfile;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", dob=" + dob +
                ", age=" + age +
                ", profileImageUrl='" + profileImageUrl + '\'' +
                ", publicProfile=" + publicProfile +
                '}';
    }
}


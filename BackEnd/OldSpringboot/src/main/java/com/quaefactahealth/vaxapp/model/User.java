package com.quaefactahealth.vaxapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Data //Builds all getters and setters
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    // The security library compares 'username' and the decoded password to authenticate a user signing in
    // Since we want to log in with an email, we need to label the email as 'username'
    @NotBlank(message = "Email is required")
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @NotBlank(message = "Password field is required")
    @Column(name = "password", nullable = false, columnDefinition = "TEXT")
    private String password;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "fk_information_id")
//    private UserInformation userInformation;

    /*
    UserDetails interface methods
    */
    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
package com.quaefactahealth.vaxapp.Repositories;

import com.quaefactahealth.vaxapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String email);
    User getById(Long id);
    Optional<User> getByUsernameIgnoreCase(String username);
}

package com.quaefactahealth.vaxapp.Repositories;

import com.quaefactahealth.vaxapp.model.UserInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInformationRepository extends JpaRepository<UserInformation, Long> {
    UserInformation getById(Long id);
    Optional<UserInformation> findById(Long id);
}

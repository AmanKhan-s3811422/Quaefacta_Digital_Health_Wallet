package com.quaefactahealth.vaxapp.configurations;

import com.quaefactahealth.vaxapp.Repositories.UserInformationRepository;
import com.quaefactahealth.vaxapp.model.UserInformation;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class UserInformationConfig {
    @Bean(name="UserInformationSetup")
    CommandLineRunner commandLineRunner(UserInformationRepository repository) {
        return args -> {
            UserInformation user1 = UserInformation.builder()
                    .id((long)1)
                    .firstName("Quoc")
                    .lastName("Tran")
                    .address1("123 Cool Street")
                    .postCode("3015")
                    .phone("094552432")
                    .build();
            UserInformation user2 = UserInformation.builder()
                    .id((long)2)
                    .firstName("Loppy")
                    .lastName("Loo")
                    .address1("123 Cold Street")
                    .postCode("3016")
                    .DOB("21/09/1987")
                    .phone("094552431")
                    .build();
            if (repository.findById(user1.getId()).isPresent())  {
                System.out.println("User information already exists");
            } else {
                repository.save(user1);
            }
            if (repository.findById(user2.getId()).isPresent()) {
                System.out.println("User information already exists");
            } else {
                repository.save(user2);
            }
        };
    }
}

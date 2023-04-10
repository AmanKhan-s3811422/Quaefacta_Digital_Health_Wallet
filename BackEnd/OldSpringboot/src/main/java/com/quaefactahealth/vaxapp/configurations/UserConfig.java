package com.quaefactahealth.vaxapp.configurations;

import com.quaefactahealth.vaxapp.Repositories.UserRepository;
import com.quaefactahealth.vaxapp.model.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class UserConfig {
    @Bean(name="UserConfig")
    CommandLineRunner commandLineRunner(UserRepository repository) {
        return args -> {
            User user1 = User.builder()
                    .username("s3827826@student.rmit.edu.com")
                    .password("$2a$10$Ea9HMwdKViguPOUALunrVeBnpPIBCar6dsuDz8T6dlL2CEhMQOwrK")
                    .build();
            User user2 = User.builder()
                    .username("mario@luigi.com")
                    .password("$2a$10$Ea9HMwdKViguPOUALunrVeBnpPIBCar6dsuDz8T6dlL2CEhMQOwrK")
                    .build();

            if (repository.getByUsernameIgnoreCase(user1.getUsername()).isPresent()) {
                System.out.println("User already exists");
            } else {
                repository.save(user1);
            }
            if (repository.getByUsernameIgnoreCase(user2.getUsername()).isPresent()) {
                System.out.println("User already exists");
            } else {
                repository.save(user2);
            }
        };
    }
}

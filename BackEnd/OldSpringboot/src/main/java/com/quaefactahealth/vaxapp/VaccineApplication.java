package com.quaefactahealth.vaxapp;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.Resource;

@SpringBootApplication
public class VaccineApplication {

    private static final Logger LOGGER = LogManager.getLogger(VaccineApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(VaccineApplication.class, args);

        LOGGER.info("Info level log message");
        LOGGER.debug("Debug level log message");
        LOGGER.error("Error level log message");
    }


    @Bean(name="passwordEncoder")
    // Choose strength from 4-31. Standard is 10. Higher number for higher work needed to calculate hash
    BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder(10);
    }
}

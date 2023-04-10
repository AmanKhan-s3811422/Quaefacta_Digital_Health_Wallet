package com.quaefactahealth.vaxapp.services;


import com.quaefactahealth.vaxapp.Repositories.UserInformationRepository;
import com.quaefactahealth.vaxapp.Repositories.UserRepository;
import com.quaefactahealth.vaxapp.exceptions.EmailAlreadyExistsException;
import com.quaefactahealth.vaxapp.model.User;
import com.quaefactahealth.vaxapp.model.UserInformation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;



@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserInformationRepository userInformationRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, UserInformationRepository userInformationRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.userInformationRepository = userInformationRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserByID(Long id) { return userRepository.getById(id); }

    public UserInformation getUserInformationByID(Long id) { return userInformationRepository.getById(id); }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalStateException("User with Id " + id + " does not exist");
        }
        userRepository.deleteById(id);
    }

    public User saveUser (User newUser){
        try {
            // Save the newUser in the users table
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setUsername(newUser.getUsername());
            User savedUser = userRepository.save(newUser);
            // Save a blank entry into the userInformation table
            UserInformation userInformation = UserInformation.builder().id(savedUser.getId())
                                                                       .email(savedUser.getUsername())
//                                                                       .user(savedUser)
                                                                       .build();
            userInformationRepository.save(userInformation);
            return savedUser;
        } catch (Exception e) {
            if (userRepository.getByUsernameIgnoreCase(newUser.getUsername()).isPresent()) {
                throw new EmailAlreadyExistsException("Email '" + newUser.getUsername() + "' already exists");
            }
        }
        return userRepository.save(newUser);
    }

    @Transactional
    public User updateUserInformation(Long id, String firstName, String lastName, String gender, String DOB, String address1, String address2, String postCode, String country, String state, String phone, String email) {
        // Get the user and information by ID
        User user = userRepository.findById(id).orElseThrow(() ->
                new IllegalStateException("User with Id " + id + " does not exist"));
        UserInformation userInformation = userInformationRepository.findById(id).orElseThrow(() ->
                new IllegalStateException("User with Id " + id + " does not exist"));

        // Check that each field is something different from what's in the table
        final boolean FirstNameIsNew = !Objects.equals(userInformation.getFirstName(), firstName);
        final boolean LastNameIsNew = !Objects.equals(userInformation.getLastName(), lastName);
        final boolean GenderIsNew = !Objects.equals(userInformation.getGender(), gender);
        final boolean DOBIsNew = !Objects.equals(userInformation.getDOB(), DOB);
        final boolean Address1IsNew = !Objects.equals(userInformation.getAddress1(), address1);
        final boolean Address2IsNew = !Objects.equals(userInformation.getAddress2(), address2);
        final boolean PostCodeIsNew = !Objects.equals(userInformation.getPostCode(), postCode);
        final boolean CountryIsNew = !Objects.equals(userInformation.getCountry(), country);
        final boolean StateIsNew = !Objects.equals(userInformation.getState(), state);
        final boolean PhoneIsNew = !Objects.equals(userInformation.getPhone(), phone);
        final boolean EmailIsNew = !Objects.equals(user.getUsername(), email);

        final boolean EmailIsPresent = email != null && email.length() > 0;
        final boolean EmailAlreadyExists = userRepository.getByUsernameIgnoreCase(email).isPresent();

        // Apply changes to each column if they are different
        if (FirstNameIsNew) {
            userInformation.setFirstName(firstName);
        }
        if (LastNameIsNew) {
            userInformation.setLastName(lastName);
        }
        if (GenderIsNew) {
            userInformation.setGender(gender);
        }
        if (DOBIsNew) {
            userInformation.setDOB(DOB);
        }
        if (Address1IsNew) {
            userInformation.setAddress1(address1);
        }
        if (Address2IsNew) {
            userInformation.setAddress2(address2);
        }
        if (PostCodeIsNew) {
            userInformation.setPostCode(postCode);
        }
        if (CountryIsNew) {
            userInformation.setCountry(country);
        }
        if (StateIsNew) {
            userInformation.setState(state);
        }
        if (PhoneIsNew) {
            userInformation.setPhone(phone);
        }
        if (EmailIsPresent && EmailIsNew) {
            if (EmailAlreadyExists) {
                throw new EmailAlreadyExistsException("Email '" + email + "' already exists");
            }
            user.setUsername(email);
            userInformation.setEmail(email);
        }
        return user;
    }
}

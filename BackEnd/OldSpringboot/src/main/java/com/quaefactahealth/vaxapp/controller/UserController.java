package com.quaefactahealth.vaxapp.controller;


import com.quaefactahealth.vaxapp.model.User;
import com.quaefactahealth.vaxapp.model.UserInformation;
import com.quaefactahealth.vaxapp.payload.JWTLoginSuccessResponse;
import com.quaefactahealth.vaxapp.payload.LoginRequest;
import com.quaefactahealth.vaxapp.security.JwtTokenProvider;
import com.quaefactahealth.vaxapp.services.MapValidationErrorService;
import com.quaefactahealth.vaxapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static com.quaefactahealth.vaxapp.security.SecurityConstant.TOKEN_PREFIX;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final MapValidationErrorService mapValidationErrorService;
    private final UserService userService;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    @Autowired
    public UserController(UserService userService, MapValidationErrorService mapValidationErrorService, JwtTokenProvider tokenProvider, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.mapValidationErrorService = mapValidationErrorService;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping()
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping(path = "{userId}")
    public User getUser(@PathVariable("userId") Long userId) {
        return userService.getUserByID(userId);
    }

    @GetMapping(path = "/information/{userId}")
    public UserInformation getUserInformation(@PathVariable("userId") Long userId) {
        return userService.getUserInformationByID(userId);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;
        User newUser = userService.saveUser(user);
        return  new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername().toLowerCase(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
    }

    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
    }

    @PutMapping(path = "{userId}")
    public ResponseEntity<?> updateUserInformation(@PathVariable("userId") Long userId, @Valid @RequestBody UserInformation userInformation){
        userService.updateUserInformation(userId,
                                            userInformation.getFirstName(),
                                            userInformation.getLastName(),
                                            userInformation.getGender(),
                                            userInformation.getDOB(),
                                            userInformation.getAddress1(),
                                            userInformation.getAddress2(),
                                            userInformation.getPostCode(),
                                            userInformation.getCountry(),
                                            userInformation.getState(),
                                            userInformation.getPhone(),
                                            userInformation.getEmail());

        return  new ResponseEntity<>(userService.getUserByID(userId), HttpStatus.CREATED);
    }
}

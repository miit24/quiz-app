package com.company.quiz.Routes;

import com.company.quiz.Controllers.UserController;
import com.company.quiz.Models.ErrorResponse;
import com.company.quiz.Models.JwtRequest;
import com.company.quiz.Models.JwtResponse;
import com.company.quiz.Models.User;
import com.company.quiz.helper.JwtHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthRoute {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    UserController userController;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private JwtHelper helper;

    private Logger logger = LoggerFactory.getLogger(AuthRoute.class);


    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {
        User user = userController.find(request.getEmail());
        this.doAuthenticate(request.getEmail(), request.getPassword());
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = this.helper.generateToken(userDetails);

        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .username(userDetails.getUsername())
                .name(user.getName())
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);


        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }

    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }

    @PostMapping("/create")
    public ResponseEntity<User> create(@RequestBody User user){
        try{
            user.setRole("USER,");
            user.setEnable(1);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User u = userController.create(user);
            return ResponseEntity.of(Optional.of(u));
        } catch(Exception e) {
            System.out.println(e.getMessage());
            throw new DuplicateKeyException("Duplicate Email");
        }
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<ErrorResponse> exceptionHandler2() {
        ErrorResponse error = new ErrorResponse("Credentials Invalid !!",true);
        return ResponseEntity.status(500).body(error);
    }

}



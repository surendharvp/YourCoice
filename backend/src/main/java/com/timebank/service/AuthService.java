package com.timebank.service;

import com.timebank.dto.AuthRequest;
import com.timebank.dto.AuthResponse;
import com.timebank.dto.RegisterRequest;
import com.timebank.dto.UserDTO;
import com.timebank.exception.ResourceNotFoundException;
import com.timebank.model.User;
import com.timebank.repository.UserRepository;
import com.timebank.security.JwtTokenProvider;
import io.micrometer.core.annotation.Timed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    @Timed("auth.register")
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        log.debug("Registering new user with email: {}", request.getEmail());
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadCredentialsException("Email already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setTimeBalance(0);

        user = userRepository.save(user);
        String token = tokenProvider.generateToken(user.getEmail());

        return AuthResponse.builder()
            .token(token)
            .user(mapToDTO(user))
            .build();
    }

    @Timed("auth.login")
    public AuthResponse login(AuthRequest request) {
        log.debug("Attempting login for user: {}", request.getEmail());
        
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));

            String token = tokenProvider.generateToken(authentication);

            return AuthResponse.builder()
                .token(token)
                .user(mapToDTO(user))
                .build();
        } catch (Exception e) {
            log.error("Login failed for user: {}", request.getEmail(), e);
            throw new BadCredentialsException("Invalid email or password");
        }
    }

    private UserDTO mapToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setTimeBalance(user.getTimeBalance());
        return dto;
    }
}
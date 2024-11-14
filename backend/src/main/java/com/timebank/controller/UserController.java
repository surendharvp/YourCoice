package com.timebank.controller;

import com.timebank.dto.ProfileDTO;
import com.timebank.dto.TransactionDTO;
import com.timebank.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ProfileDTO> getProfile() {
        return ResponseEntity.ok(userService.getCurrentUserProfile());
    }

    @PutMapping("/profile")
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO) {
        return ResponseEntity.ok(userService.updateProfile(profileDTO));
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<TransactionDTO>> getTransactions() {
        return ResponseEntity.ok(userService.getCurrentUserTransactions());
    }
}
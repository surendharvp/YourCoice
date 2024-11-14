package com.timebank.service;

import com.timebank.dto.ProfileDTO;
import com.timebank.dto.TransactionDTO;
import com.timebank.model.User;
import com.timebank.repository.TransactionRepository;
import com.timebank.repository.UserRepository;
import com.timebank.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final SecurityUtils securityUtils;

    public ProfileDTO getCurrentUserProfile() {
        User user = securityUtils.getCurrentUser();
        return mapToProfileDTO(user);
    }

    @Transactional
    public ProfileDTO updateProfile(ProfileDTO profileDTO) {
        User user = securityUtils.getCurrentUser();
        user.setName(profileDTO.getName());
        // Update other fields as needed
        user = userRepository.save(user);
        return mapToProfileDTO(user);
    }

    public List<TransactionDTO> getCurrentUserTransactions() {
        User user = securityUtils.getCurrentUser();
        return transactionRepository.findByUserIdOrderByTimestampDesc(user.getId())
            .stream()
            .map(this::mapToTransactionDTO)
            .collect(Collectors.toList());
    }

    private ProfileDTO mapToProfileDTO(User user) {
        ProfileDTO dto = new ProfileDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setTimeBalance(user.getTimeBalance());
        return dto;
    }

    private TransactionDTO mapToTransactionDTO(Transaction transaction) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(transaction.getId());
        dto.setType(transaction.getType());
        dto.setAmount(transaction.getAmount());
        dto.setTimestamp(transaction.getTimestamp());
        dto.setDescription(transaction.getDescription());
        return dto;
    }
}
package com.timebank.service;

import com.timebank.dto.RequestDTO;
import com.timebank.exception.ResourceNotFoundException;
import com.timebank.model.Request;
import com.timebank.model.User;
import com.timebank.repository.RequestRepository;
import com.timebank.security.SecurityUtils;
import io.micrometer.core.annotation.Timed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RequestService {
    private final RequestRepository requestRepository;
    private final SecurityUtils securityUtils;
    private final WebSocketService webSocketService;

    @Timed("requests.getAll")
    @Cacheable(value = "requestCache", key = "'requests'")
    public Page<RequestDTO> getAllRequests(Pageable pageable) {
        log.debug("Fetching all requests with pagination");
        return requestRepository.findByStatusOrderByCreatedAtDesc("open", pageable)
            .map(this::mapToDTO);
    }

    @Timed("requests.getById")
    @Cacheable(value = "requestCache", key = "#id")
    public RequestDTO getRequestById(Long id) {
        log.debug("Fetching request with id: {}", id);
        Request request = requestRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Request", "id", id));
        return mapToDTO(request);
    }

    @Async
    @Timed("requests.search")
    public CompletableFuture<List<RequestDTO>> searchRequests(String query) {
        log.debug("Searching requests with query: {}", query);
        return CompletableFuture.completedFuture(
            requestRepository.findByTitleContainingOrDescriptionContaining(query, query)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList())
        );
    }

    @Timed("requests.create")
    @Transactional
    @CacheEvict(value = "requestCache", allEntries = true)
    public RequestDTO createRequest(RequestDTO requestDTO) {
        log.debug("Creating new request: {}", requestDTO);
        User user = securityUtils.getCurrentUser();
        
        Request request = new Request();
        request.setTitle(requestDTO.getTitle());
        request.setDescription(requestDTO.getDescription());
        request.setEstimatedHours(requestDTO.getEstimatedHours());
        request.setStatus("open");
        request.setCreatedAt(LocalDateTime.now());
        request.setUser(user);

        request = requestRepository.save(request);
        
        RequestDTO createdRequest = mapToDTO(request);
        webSocketService.broadcastRequestUpdate(request.getId().toString(), createdRequest);
        
        return createdRequest;
    }

    @Timed("requests.update")
    @Transactional
    @CacheEvict(value = "requestCache", key = "#id")
    public RequestDTO updateRequest(Long id, RequestDTO requestDTO) {
        log.debug("Updating request with id: {}", id);
        Request request = requestRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Request", "id", id));
            
        User currentUser = securityUtils.getCurrentUser();
        if (!request.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("Not authorized to update this request");
        }

        request.setTitle(requestDTO.getTitle());
        request.setDescription(requestDTO.getDescription());
        request.setEstimatedHours(requestDTO.getEstimatedHours());
        
        request = requestRepository.save(request);
        
        RequestDTO updatedRequest = mapToDTO(request);
        webSocketService.broadcastRequestUpdate(request.getId().toString(), updatedRequest);
        
        return updatedRequest;
    }

    @Timed("requests.delete")
    @Transactional
    @CacheEvict(value = "requestCache", allEntries = true)
    public void deleteRequest(Long id) {
        log.debug("Deleting request with id: {}", id);
        Request request = requestRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Request", "id", id));
            
        User currentUser = securityUtils.getCurrentUser();
        if (!request.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("Not authorized to delete this request");
        }

        requestRepository.delete(request);
        webSocketService.broadcastRequestUpdate(id.toString(), null);
    }

    private RequestDTO mapToDTO(Request request) {
        RequestDTO dto = new RequestDTO();
        dto.setId(request.getId());
        dto.setTitle(request.getTitle());
        dto.setDescription(request.getDescription());
        dto.setEstimatedHours(request.getEstimatedHours());
        dto.setStatus(request.getStatus());
        dto.setCreatedAt(request.getCreatedAt());
        dto.setUser(mapToUserDTO(request.getUser()));
        dto.setBids(request.getBids().stream()
            .map(this::mapToBidDTO)
            .collect(Collectors.toList()));
        return dto;
    }
}
package com.timebank.repository;

import com.timebank.model.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findByRequestIdOrderByCreatedAtDesc(Long requestId);
    List<Bid> findByProviderIdOrderByCreatedAtDesc(Long providerId);
}
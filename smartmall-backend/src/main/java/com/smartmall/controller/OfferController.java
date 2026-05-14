package com.smartmall.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smartmall.entity.Offer;
import com.smartmall.exception.ResourceNotFoundException;
import com.smartmall.repository.OfferRepository;

@RestController
@RequestMapping("/api/offers")
public class OfferController {

    private final OfferRepository offerRepository;

    public OfferController(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    @PostMapping
    public ResponseEntity<Offer> create(@RequestBody Offer offer) {
        return ResponseEntity.status(HttpStatus.CREATED).body(offerRepository.save(offer));
    }

    @GetMapping
    public ResponseEntity<List<Offer>> getAll(@RequestParam(required = false) Long shopId) {
        if (shopId != null) {
            return ResponseEntity.ok(offerRepository.findByShopId(shopId));
        }
        return ResponseEntity.ok(offerRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offer> getById(@PathVariable Long id) {
        return ResponseEntity.ok(offerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offer not found: " + id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Offer> update(@PathVariable Long id, @RequestBody Offer offer) {
        Offer existing = offerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offer not found: " + id));
        existing.setTitle(offer.getTitle());
        existing.setDescription(offer.getDescription());
        existing.setDiscountPercent(offer.getDiscountPercent());
        existing.setStartsAt(offer.getStartsAt());
        existing.setEndsAt(offer.getEndsAt());
        existing.setShop(offer.getShop());
        return ResponseEntity.ok(offerRepository.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Offer offer = offerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offer not found: " + id));
        offerRepository.delete(offer);
        return ResponseEntity.noContent().build();
    }
}

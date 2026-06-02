package com.portfolio.kevin.controller;

import com.portfolio.kevin.model.TimelineItem;
import com.portfolio.kevin.repository.TimelineItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timeline")
@CrossOrigin(origins = "http://localhost:5173")
public class TimelineItemController {

    @Autowired
    private TimelineItemRepository timelineItemRepository;

    @GetMapping
    public List<TimelineItem> getAllItems() {
        return timelineItemRepository.findAll();
    }

    @PostMapping
    public TimelineItem addItem(@RequestBody TimelineItem item) {
        if (item.getStatus() != null && item.getStatus().equalsIgnoreCase("ONGOING")) {
            item.setEndDate(null);
        }
        return timelineItemRepository.save(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TimelineItem> updateItem(@PathVariable Long id, @RequestBody TimelineItem itemDetails) {
        return timelineItemRepository.findById(id)
                .map(item -> {
                    item.setRole(itemDetails.getRole());
                    item.setCompany(itemDetails.getCompany());
                    item.setDuration(itemDetails.getDuration());
                    item.setStartDate(itemDetails.getStartDate());
                    item.setEndDate(itemDetails.getEndDate());
                    item.setStatus(itemDetails.getStatus());
                    item.setLocation(itemDetails.getLocation());
                    item.setGpaOrDetails(itemDetails.getGpaOrDetails());
                    item.setDescription(itemDetails.getDescription());
                    item.setType(itemDetails.getType());
                    TimelineItem updated = timelineItemRepository.save(item);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        return timelineItemRepository.findById(id)
                .map(item -> {
                    timelineItemRepository.delete(item);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

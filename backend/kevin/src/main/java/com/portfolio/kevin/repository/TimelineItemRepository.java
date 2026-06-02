package com.portfolio.kevin.repository;

import com.portfolio.kevin.model.TimelineItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimelineItemRepository extends JpaRepository<TimelineItem, Long> {
    List<TimelineItem> findByType(String type);
}

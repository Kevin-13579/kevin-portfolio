package com.portfolio.kevin.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "timeline_items")
@Data
public class TimelineItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String role;
    private String company; // Or institution
    private String duration;
    private String startDate;
    private String endDate;
    private String status; // COMPLETED, ONGOING
    private String location;
    private String gpaOrDetails; // e.g. "CGPA: 7.70" or achievements in experience

    @Column(length = 2000)
    private String description;

    private String type; // EXPERIENCE, EDUCATION
}

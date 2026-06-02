package com.portfolio.kevin.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "certifications")
@Data
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String issuer;
    private String date;
    
    @Column(length = 1000)
    private String link;
}

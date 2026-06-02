package com.portfolio.kevin.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "profile")
@Data
public class Profile {
    @Id
    private Long id = 1L;

    private String name;
    private String title;

    @Column(length = 2000)
    private String bio;

    private String email;
    private String location;
    private String phone;
    private String githubLink;
    private String linkedinLink;
    private String twitterLink;
    private String websiteLink;

    @Column(columnDefinition = "LONGTEXT")
    private String imageUrl;

    private String adminPassword = "13579";
}


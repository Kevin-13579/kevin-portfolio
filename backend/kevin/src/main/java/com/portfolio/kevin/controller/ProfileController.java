package com.portfolio.kevin.controller;

import com.portfolio.kevin.model.Profile;
import com.portfolio.kevin.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    @Autowired
    private ProfileRepository profileRepository;

    @GetMapping
    public Profile getProfile() {
        return profileRepository.findById(1L).orElseGet(() -> {
            Profile defaultProfile = new Profile();
            defaultProfile.setId(1L);
            defaultProfile.setName("Kevin P");
            defaultProfile.setTitle("BCA Student | Full Stack Developer & DevOps Cloud Engineer");
            defaultProfile.setBio("Motivated and detail-oriented BCA student with skills in C/C++, JavaScript, Java, and MySQL, seeking an internship or entry-level role in programming or app development to apply and grow technical expertise.");
            defaultProfile.setEmail("kevinlokesh333@gmail.com");
            defaultProfile.setLocation("Coimbatore, Tamilnadu");
            defaultProfile.setPhone("+91 98765 43210");
            defaultProfile.setGithubLink("https://github.com");
            defaultProfile.setLinkedinLink("https://linkedin.com");
            defaultProfile.setTwitterLink("https://twitter.com");
            defaultProfile.setWebsiteLink("https://kevinp.dev");
            defaultProfile.setImageUrl("");
            defaultProfile.setAdminPassword("13579");
            return profileRepository.save(defaultProfile);
        });
    }

    @PutMapping
    public Profile updateProfile(@RequestBody Profile updatedProfile) {
        updatedProfile.setId(1L); // Force single row in DB
        return profileRepository.save(updatedProfile);
    }
}

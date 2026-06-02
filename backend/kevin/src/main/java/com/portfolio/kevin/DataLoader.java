package com.portfolio.kevin;

import com.portfolio.kevin.model.*;
import com.portfolio.kevin.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private CertificationRepository certificationRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private TimelineItemRepository timelineItemRepository;

    @Override
    public void run(String... args) throws Exception {
        // Seed profile if empty
        if (profileRepository.count() == 0) {
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
            profileRepository.save(defaultProfile);
        }

        // Seed projects if empty
        if (projectRepository.count() == 0) {
            Project project1 = new Project();
            project1.setTitle("AI Pothole Detection & Mapping System");
            project1.setDescription("Developed a full-stack solution using React JS and Spring Boot to identify and log road hazards. Integrated Gemini AI API for real-time image analysis to accurately verify the presence and severity of potholes. Implemented a React-Leaflet interactive map to dynamically visualize geolocated hazard data on a central project.");
            project1.setTechStack("React JS, Spring Boot, Gemini AI, Leaflet Map, MySQL");
            project1.setGithubLink("https://github.com");
            projectRepository.save(project1);

            Project project2 = new Project();
            project2.setTitle("Elite Sponsorship Platform");
            project2.setDescription("Architected a platform connecting student developers with corporate sponsors. Implemented multi-role authentication and a dynamic proposal tracking system using Spring Boot and React.");
            project2.setTechStack("React JS, Spring Boot, JWT Auth, REST APIs, MySQL");
            project2.setGithubLink("https://github.com");
            projectRepository.save(project2);
        }

        // Seed skills if empty
        if (skillRepository.count() == 0) {
            saveSkill("React JS", "Frontend");
            saveSkill("CSS3", "Frontend");
            saveSkill("JavaScript (ES6+)", "Frontend");
            saveSkill("HTML5", "Frontend");

            saveSkill("Java", "Backend");
            saveSkill("Spring Boot", "Backend");
            saveSkill("Microservices", "Backend");
            saveSkill("REST APIs", "Backend");

            saveSkill("MySQL", "Database");
            saveSkill("Git", "Tools");
        }

        // Seed timeline items if empty (experience & education)
        if (timelineItemRepository.count() == 0) {
            // Experience
            TimelineItem exp = new TimelineItem();
            exp.setRole("Technical Team Lead");
            exp.setCompany("Active Academic Projects");
            exp.setDuration("Active Academic Projects");
            exp.setLocation("Coimbatore, Tamilnadu");
            exp.setGpaOrDetails("Lead developer");
            exp.setDescription("Directed development teams of 5 to 11 members, overseeing task delegation, sprint coordination, and version control workflows via Git. Mentored peers in Java and React fundamentals to guarantee high-quality project deliveries.");
            exp.setType("EXPERIENCE");
            timelineItemRepository.save(exp);

            // Education
            TimelineItem edu = new TimelineItem();
            edu.setRole("Bachelor of Computer Applications (BCA)");
            edu.setCompany("Rathinam College of Arts and Science");
            edu.setDuration("Expected 2027");
            edu.setLocation("Coimbatore, Tamilnadu");
            edu.setGpaOrDetails("CGPA: 7.70");
            edu.setDescription("Focus on computer application basics, system architecture, programming methodologies in C, Java, Python, data structures, and database management systems.");
            edu.setType("EDUCATION");
            timelineItemRepository.save(edu);
        }

        // Seed events if empty
        if (eventRepository.count() == 0) {
            Event event1 = new Event();
            event1.setTitle("Interofest Hackathon");
            event1.setDate("Feb 2026");
            event1.setLocation("Rathinam Campus");
            event1.setDescription("Collaborated in a high-intensity developer environment to architect and deliver a functional Minimum Viable Product (MVP) within strict, challenging time constraints.");
            eventRepository.save(event1);

            Event event2 = new Event();
            event2.setTitle("Hack with GDGS3");
            event2.setDate("Feb 2026");
            event2.setLocation("KSR Engineering College");
            event2.setDescription("Focused on rapid prototyping, system engineering, and technical problem-solving during an intensive 36-hour physical development cycle.");
            eventRepository.save(event2);
        }

        // Seed certifications if empty
        if (certificationRepository.count() == 0) {
            Certification cert = new Certification();
            cert.setName("Java Full Stack Development");
            cert.setIssuer("Infosys Springboard");
            cert.setDate("March 2026");
            cert.setLink("https://springboard.infosys.com");
            certificationRepository.save(cert);
        }
    }

    private void saveSkill(String name, String category) {
        Skill skill = new Skill();
        skill.setName(name);
        skill.setCategory(category);
        skillRepository.save(skill);
    }
}


package com.portfolio.kevin.controller;

import com.portfolio.kevin.model.Certification;
import com.portfolio.kevin.repository.CertificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
@CrossOrigin(origins = "http://localhost:5173")
public class CertificationController {

    @Autowired
    private CertificationRepository certificationRepository;

    @GetMapping
    public List<Certification> getAllCertifications() {
        return certificationRepository.findAll();
    }

    @PostMapping
    public Certification addCertification(@RequestBody Certification certification) {
        return certificationRepository.save(certification);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Certification> updateCertification(@PathVariable Long id, @RequestBody Certification certDetails) {
        return certificationRepository.findById(id)
                .map(cert -> {
                    cert.setName(certDetails.getName());
                    cert.setIssuer(certDetails.getIssuer());
                    cert.setDate(certDetails.getDate());
                    cert.setLink(certDetails.getLink());
                    Certification updated = certificationRepository.save(cert);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertification(@PathVariable Long id) {
        return certificationRepository.findById(id)
                .map(cert -> {
                    certificationRepository.delete(cert);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

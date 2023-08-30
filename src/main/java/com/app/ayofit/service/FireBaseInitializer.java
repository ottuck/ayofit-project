package com.app.ayofit.service;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Service
public class FireBaseInitializer {
	
	@Value("${app.firebase-configuration-file}")
	private String firebaseConfigPath;
	
	@PostConstruct
	public void initialize () {
		try {
			
			FirebaseOptions options = new FirebaseOptions.Builder().setCredentials(
					GoogleCredentials.fromStream( new ClassPathResource(firebaseConfigPath).getInputStream())
					).build();
			
			if (FirebaseApp.getApps().isEmpty()) {
				FirebaseApp.initializeApp(options);
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}

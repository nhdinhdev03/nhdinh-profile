package com.nhdinh.nhdinh_profile;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ProfileServiceBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProfileServiceBackendApplication.class, args);
	}

}

package com.nhdinh.nhdinh_profile.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode;

/**
 * Web Configuration
 * Fix PageImpl serialization warning by using DTO mode
 */
@Configuration
@EnableSpringDataWebSupport(pageSerializationMode = PageSerializationMode.VIA_DTO)
public class WebConfig {
    // This configuration will fix the PageImpl serialization warning
    // by using DTO mode instead of direct PageImpl serialization
}
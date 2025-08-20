package com.nhdinh.profile.auth.security.user.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.profile.modules.AdminUser.AdminUser;
import com.nhdinh.profile.modules.AdminUser.AdminUserDAO;

@Service
public class AdminUserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    AdminUserDAO adminUserDAO;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        AdminUser user = adminUserDAO.findByPhoneNumberOrUsername(identifier)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with identifier: " + identifier));

        return AdminUserDetailsImpl.build(user);
    }

    @Transactional
    public UserDetails loadUserByUserId(String userId) throws UsernameNotFoundException {
        try {
            UUID userUUID = UUID.fromString(userId);
            AdminUser user = adminUserDAO.findById(userUUID)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found with id: " + userId));

            return AdminUserDetailsImpl.build(user);
        } catch (IllegalArgumentException e) {
            throw new UsernameNotFoundException("Invalid user ID format: " + userId);
        }
    }

    @Transactional
    public UserDetails loadUserByPhoneNumber(String phoneNumber) throws UsernameNotFoundException {
        AdminUser user = adminUserDAO.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with phone number: " + phoneNumber));

        return AdminUserDetailsImpl.build(user);
    }
}

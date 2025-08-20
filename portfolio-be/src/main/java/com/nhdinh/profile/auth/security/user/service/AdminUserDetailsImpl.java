package com.nhdinh.profile.auth.security.user.service;

import java.util.Collection;
import java.util.Collections;
import java.util.Objects;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nhdinh.profile.modules.AdminUser.AdminUser;

public class AdminUserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private UUID id;
    private String phoneNumber;
    private String username;
    private String fullName;
    
    @JsonIgnore
    private String password;
    
    private boolean isActive;
    
    private Collection<? extends GrantedAuthority> authorities;

    public AdminUserDetailsImpl(UUID id, String phoneNumber, String username, String fullName, 
                               String password, boolean isActive,
                               Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.fullName = fullName;
        this.password = password;
        this.isActive = isActive;
        this.authorities = authorities;
    }

    public static AdminUserDetailsImpl build(AdminUser user) {
        // For AdminUser, we'll give them ADMIN role by default
        Collection<GrantedAuthority> authorities = Collections.singletonList(
            new SimpleGrantedAuthority("ROLE_ADMIN")
        );

        return new AdminUserDetailsImpl(
                user.getUserId(),
                user.getPhoneNumber(),
                user.getUsername(),
                user.getFullName(),
                user.getPasswordHash(),
                user.getIsActive(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public UUID getId() {
        return id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getFullName() {
        return fullName;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username != null ? username : phoneNumber; // Use phone as username if username is null
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        AdminUserDetailsImpl user = (AdminUserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

package com.team.vendorfrontend.model;

import java.time.LocalDateTime;

public class User_KM {
    private Integer userId;
    private String email;
    private String name;
    private Integer addressId;
    private Double balance;
    private LocalDateTime createdAt;

    // Constructors
    public User_KM() {
    }

    public User_KM(Integer userId, String email, String name, Integer addressId, Double balance, LocalDateTime createdAt) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.addressId = addressId;
        this.balance = balance;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "User_KM{" +
                "userId=" + userId +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", addressId=" + addressId +
                ", balance=" + balance +
                ", createdAt=" + createdAt +
                '}';
    }
}
package com.team.vendorfrontend.model;

public class User_AB {
    private Long userId;
    private String name;
    private String email;
    private Double balance;
    
    // Constructors
    public User_AB() {}
    
    public User_AB(Long userId, String name, String email, Double balance) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.balance = balance;
    }
    
    // Getters and Setters
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public Double getBalance() {
        return balance;
    }
    
    public void setBalance(Double balance) {
        this.balance = balance;
    }
}
package com.team.vendorfrontend.model;

public class Transaction_HR {
    private Long transactionId;
    private Long deliveryAddressId;
    private Integer quantity;
    private String createdAt;
    
    // Constructors
    public Transaction_HR() {}
    
    public Transaction_HR(Long transactionId, Long deliveryAddressId, Integer quantity, String createdAt) {
        this.transactionId = transactionId;
        this.deliveryAddressId = deliveryAddressId;
        this.quantity = quantity;
        this.createdAt = createdAt;
    }
    
    // Getters and Setters
    public Long getTransactionId() {
        return transactionId;
    }
    
    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }
    
    public Long getDeliveryAddressId() {
        return deliveryAddressId;
    }
    
    public void setDeliveryAddressId(Long deliveryAddressId) {
        this.deliveryAddressId = deliveryAddressId;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    public String getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}

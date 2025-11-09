package com.team.vendorfrontend.model;

public class TransactionQuantity_KM {
    private String userName;
    private Double quantity;
    private Long transactionId;
    private Long deliveryAddressId;

    // Constructors
    public TransactionQuantity_KM() {
    }

    public TransactionQuantity_KM(String userName, Double quantity, Long transactionId, Long deliveryAddressId) {
        this.userName = userName;
        this.quantity = quantity;
        this.transactionId = transactionId;
        this.deliveryAddressId = deliveryAddressId;
    }

    // Getters and Setters
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

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

    @Override
    public String toString() {
        return "TransactionQuantity_KM{" +
                "userName='" + userName + '\'' +
                ", quantity=" + quantity +
                ", transactionId=" + transactionId +
                ", deliveryAddressId=" + deliveryAddressId +
                '}';
    }
}
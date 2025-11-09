package com.team.vendorfrontend.model;

public class TransactionHistory_DP {
    private Integer transactionId;
    private Double quantity;
    private Integer branchId;
    private String userName;
    private double amount;
    private String transactionType;
    private String transactionStatus;

    // Constructors
    public TransactionHistory_DP() {
    }

    public TransactionHistory_DP(Integer transactionId, Double quantity, Integer branchId, 
                                  String userName, double amount, String transactionType, 
                                  String transactionStatus) {
        this.transactionId = transactionId;
        this.quantity = quantity;
        this.branchId = branchId;
        this.userName = userName;
        this.amount = amount;
        this.transactionType = transactionType;
        this.transactionStatus = transactionStatus;
    }

    // Getters and Setters
    public Integer getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Integer transactionId) {
        this.transactionId = transactionId;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Integer getBranchId() {
        return branchId;
    }

    public void setBranchId(Integer branchId) {
        this.branchId = branchId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getTransactionStatus() {
        return transactionStatus;
    }

    public void setTransactionStatus(String transactionStatus) {
        this.transactionStatus = transactionStatus;
    }

    @Override
    public String toString() {
        return "TransactionHistory_DP{" +
                "transactionId=" + transactionId +
                ", quantity=" + quantity +
                ", branchId=" + branchId +
                ", userName='" + userName + '\'' +
                ", amount=" + amount +
                ", transactionType='" + transactionType + '\'' +
                ", transactionStatus='" + transactionStatus + '\'' +
                '}';
    }
}
package com.team.vendorfrontend.model;

public class VirtualGoldHolding_JS {
    private String userName;
    private Integer holdingId;
    private Integer branchId;
    private Double quantity;

    // Constructors
    public VirtualGoldHolding_JS() {
    }

    public VirtualGoldHolding_JS(String userName, Integer holdingId, Integer branchId, Double quantity) {
        this.userName = userName;
        this.holdingId = holdingId;
        this.branchId = branchId;
        this.quantity = quantity;
    }

    // Getters and Setters
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getHoldingId() {
        return holdingId;
    }

    public void setHoldingId(Integer holdingId) {
        this.holdingId = holdingId;
    }

    public Integer getBranchId() {
        return branchId;
    }

    public void setBranchId(Integer branchId) {
        this.branchId = branchId;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "VirtualGoldHolding_JS{" +
                "userName='" + userName + '\'' +
                ", holdingId=" + holdingId +
                ", branchId=" + branchId +
                ", quantity=" + quantity +
                '}';
    }
}
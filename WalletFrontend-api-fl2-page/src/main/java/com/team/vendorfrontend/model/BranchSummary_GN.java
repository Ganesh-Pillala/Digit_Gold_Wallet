package com.team.vendorfrontend.model;

public class BranchSummary_GN {
    private Long vendorId;
    private Long branchId;
    private String branchName;
    private Double quantity;

    // Constructors
    public BranchSummary_GN() {
    }

    public BranchSummary_GN(Long vendorId, Long branchId, String branchName, Double quantity) {
        this.vendorId = vendorId;
        this.branchId = branchId;
        this.branchName = branchName;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getVendorId() {
        return vendorId;
    }

    public void setVendorId(Long vendorId) {
        this.vendorId = vendorId;
    }

    public Long getBranchId() {
        return branchId;
    }

    public void setBranchId(Long branchId) {
        this.branchId = branchId;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "BranchSummary_GN{" +
                "vendorId=" + vendorId +
                ", branchId=" + branchId +
                ", branchName='" + branchName + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}
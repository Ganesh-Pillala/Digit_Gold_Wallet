package com.team.vendorfrontend.model;

public class Vendor_GN {
    private Long vendorId;
    private String vendorName;
    private String contactEmail;
    private String description;
    private String createdAt;

    // Constructors
    public Vendor_GN() {
    }

    public Vendor_GN(Long vendorId, String vendorName, String contactEmail, String description, String createdAt) {
        this.vendorId = vendorId;
        this.vendorName = vendorName;
        this.contactEmail = contactEmail;
        this.description = description;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getVendorId() {
        return vendorId;
    }

    public void setVendorId(Long vendorId) {
        this.vendorId = vendorId;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Vendor_GN{" +
                "vendorId=" + vendorId +
                ", vendorName='" + vendorName + '\'' +
                ", contactEmail='" + contactEmail + '\'' +
                ", description='" + description + '\'' +
                ", createdAt='" + createdAt + '\'' +
                '}';
    }
}
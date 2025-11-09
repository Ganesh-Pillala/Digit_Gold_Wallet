package com.team.vendorfrontend.model;

public class Vendor_HR {
    private Long vendorId;
    private String vendorName;
    private String contactEmail;
    private String description;
    
    // Constructors
    public Vendor_HR() {}
    
    public Vendor_HR(Long vendorId, String vendorName, String contactEmail, String description) {
        this.vendorId = vendorId;
        this.vendorName = vendorName;
        this.contactEmail = contactEmail;
        this.description = description;
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
}

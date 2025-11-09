package com.team.vendorfrontend.model;

public class Payment_AB {
    private Long paymentId;
    private Long userId;
    private Double amount;
    private String paymentMethod;
    private String paymentStatus;
    private String createdAt;
    
    // Constructors
    public Payment_AB() {}

	public Payment_AB(Long paymentId, Long userId, Double amount, String paymentMethod, String paymentStatus,
			String createdAt) {
		super();
		this.paymentId = paymentId;
		this.userId = userId;
		this.amount = amount;
		this.paymentMethod = paymentMethod;
		this.paymentStatus = paymentStatus;
		this.createdAt = createdAt;
	}

	public Long getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(Long paymentId) {
		this.paymentId = paymentId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
    
    
    
}
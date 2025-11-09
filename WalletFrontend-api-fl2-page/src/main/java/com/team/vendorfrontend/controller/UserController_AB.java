package com.team.vendorfrontend.controller;

import com.team.vendorfrontend.model.User_AB;
import com.team.vendorfrontend.model.Payment_AB;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class UserController_AB {

    private final RestTemplate restTemplate;
    
    @Value("${backend.api.url}/api")
    private String backendUrl;
    
    public UserController_AB(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    @GetMapping("/users_AB")
    public String getUsers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "") String search,
            Model model) {
        
        try {
            String url = backendUrl + "/users";
            ResponseEntity<List<User_AB>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<User_AB>>() {}
            );
            
            List<User_AB> allUsers = response.getBody();
            if (allUsers == null) {
                allUsers = new ArrayList<>();
            }
            
            // Filter by search term
            if (!search.isEmpty()) {
                allUsers = allUsers.stream()
                    .filter(u -> u.getName().toLowerCase().contains(search.toLowerCase()))
                    .collect(Collectors.toList());
            }
            
            // Pagination
            int pageSize = 8;
            int totalUsers = allUsers.size();
            int totalPages = (int) Math.ceil((double) totalUsers / pageSize);
            
            if (page < 1) page = 1;
            if (page > totalPages && totalPages > 0) page = totalPages;
            
            int startIndex = (page - 1) * pageSize;
            int endIndex = Math.min(startIndex + pageSize, totalUsers);
            
            List<User_AB> paginatedUsers = allUsers.subList(startIndex, endIndex);
            
            model.addAttribute("users", paginatedUsers);
            model.addAttribute("currentPage", page);
            model.addAttribute("totalPages", totalPages);
            model.addAttribute("search", search);
            model.addAttribute("memberName", "Abdullah");
            
        } catch (Exception e) {
            model.addAttribute("error", "Unable to fetch users: " + e.getMessage());
            model.addAttribute("users", new ArrayList<>());
        }
        
        return "users_AB";
    }
    
    @GetMapping("/payments_AB/{userId}")
    public String getPayments(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "paymentId") String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder,
            Model model) {
        
        try {
            // Fetch user details
            String userUrl = backendUrl + "/users";
            ResponseEntity<List<User_AB>> userResponse = restTemplate.exchange(
                userUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<User_AB>>() {}
            );
            
            User_AB user = null;
            if (userResponse.getBody() != null) {
                user = userResponse.getBody().stream()
                    .filter(u -> u.getUserId().equals(userId))
                    .findFirst()
                    .orElse(null);
            }
            
            // Fetch payments
            String paymentsUrl = backendUrl + "/users/" + userId + "/payments";
            ResponseEntity<List<Payment_AB>> paymentsResponse = restTemplate.exchange(
                paymentsUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Payment_AB>>() {}
            );
            
            List<Payment_AB> allPayments = paymentsResponse.getBody();
            if (allPayments == null) {
                allPayments = new ArrayList<>();
            }
            
            // Sorting
            allPayments = sortPayments(allPayments, sortBy, sortOrder);
            
            // Pagination
            int pageSize = 10;
            int totalPayments = allPayments.size();
            int totalPages = (int) Math.ceil((double) totalPayments / pageSize);
            
            if (page < 1) page = 1;
            if (page > totalPages && totalPages > 0) page = totalPages;
            
            int startIndex = (page - 1) * pageSize;
            int endIndex = Math.min(startIndex + pageSize, totalPayments);
            
            List<Payment_AB> paginatedPayments = allPayments.subList(startIndex, endIndex);
            
            model.addAttribute("payments", paginatedPayments);
            model.addAttribute("user", user);
            model.addAttribute("userId", userId);
            model.addAttribute("currentPage", page);
            model.addAttribute("totalPages", totalPages);
            model.addAttribute("sortBy", sortBy);
            model.addAttribute("sortOrder", sortOrder);
            
        } catch (Exception e) {
            model.addAttribute("error", "Unable to fetch payments: " + e.getMessage());
            model.addAttribute("payments", new ArrayList<>());
            model.addAttribute("userId", userId);
        }
        
        return "payments_AB";
    }
    
    private List<Payment_AB> sortPayments(List<Payment_AB> payments, String sortBy, String sortOrder) {
        return payments.stream()
            .sorted((p1, p2) -> {
                int comparison = 0;
                switch (sortBy) {
                    case "paymentId":
                        comparison = Long.compare(p1.getPaymentId(), p2.getPaymentId());
                        break;
                    case "amount":
                        comparison = Double.compare(p1.getAmount(), p2.getAmount());
                        break;
                    case "paymentMethod":
                        if (p1.getPaymentMethod() != null && p2.getPaymentMethod() != null) {
                            comparison = p1.getPaymentMethod().compareTo(p2.getPaymentMethod());
                        }
                        break;
                    case "status":
                        if (p1.getPaymentStatus() != null && p2.getPaymentStatus() != null) {
                            comparison = p1.getPaymentStatus().compareTo(p2.getPaymentStatus());
                        }
                        break;
                    case "createdAt":
                        if (p1.getCreatedAt() != null && p2.getCreatedAt() != null) {
                            comparison = p1.getCreatedAt().compareTo(p2.getCreatedAt());
                        }
                        break;
                }
                return sortOrder.equals("desc") ? -comparison : comparison;
            })
            .collect(Collectors.toList());
    }
}
package com.team.vendorfrontend.controller;

import com.team.vendorfrontend.model.Vendor_HR;
import com.team.vendorfrontend.model.Transaction_HR;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class VendorController_HR {

    private final RestTemplate restTemplate;
    
    @Value("${backend.api.url}/api")
    private String backendUrl;
    
    public VendorController_HR(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    @GetMapping("/vendors_HR")
    public String getVendors(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "") String search,
            Model model) {
        
        try {
            String url = backendUrl + "/vendors";
            ResponseEntity<List<Vendor_HR>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Vendor_HR>>() {}
            );
            
            List<Vendor_HR> allVendors = response.getBody();
            if (allVendors == null) {
                allVendors = new ArrayList<>();
            }
            
            // Filter by search term
            if (!search.isEmpty()) {
                allVendors = allVendors.stream()
                    .filter(v -> v.getVendorName().toLowerCase().contains(search.toLowerCase()))
                    .collect(Collectors.toList());
            }
            
            // Pagination
            int pageSize = 8;
            int totalVendors = allVendors.size();
            int totalPages = (int) Math.ceil((double) totalVendors / pageSize);
            
            if (page < 1) page = 1;
            if (page > totalPages && totalPages > 0) page = totalPages;
            
            int startIndex = (page - 1) * pageSize;
            int endIndex = Math.min(startIndex + pageSize, totalVendors);
            
            List<Vendor_HR> paginatedVendors = allVendors.subList(startIndex, endIndex);
            
            model.addAttribute("vendors", paginatedVendors);
            model.addAttribute("currentPage", page);
            model.addAttribute("totalPages", totalPages);
            model.addAttribute("search", search);
            model.addAttribute("memberName", "Harsh");
            
        } catch (Exception e) {
            model.addAttribute("error", "Unable to fetch vendors: " + e.getMessage());
            model.addAttribute("vendors", new ArrayList<>());
        }
        
        return "vendors_HR";
    }
    
    @GetMapping("/transactions_HR")
    public String getTransactions(
            @RequestParam String vendorName,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "transactionId") String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder,
            Model model) {
        
        try {
            String url = backendUrl + "/vendors/transactions?vendorName=" + vendorName;
            ResponseEntity<List<Transaction_HR>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Transaction_HR>>() {}
            );
            
            List<Transaction_HR> allTransactions = response.getBody();
            if (allTransactions == null) {
                allTransactions = new ArrayList<>();
            }
            
            // Sorting
            allTransactions = sortTransactions(allTransactions, sortBy, sortOrder);
            
            // Pagination
            int pageSize = 10;
            int totalTransactions = allTransactions.size();
            int totalPages = (int) Math.ceil((double) totalTransactions / pageSize);
            
            if (page < 1) page = 1;
            if (page > totalPages && totalPages > 0) page = totalPages;
            
            int startIndex = (page - 1) * pageSize;
            int endIndex = Math.min(startIndex + pageSize, totalTransactions);
            
            List<Transaction_HR> paginatedTransactions = allTransactions.subList(startIndex, endIndex);
            
            model.addAttribute("transactions", paginatedTransactions);
            model.addAttribute("vendorName", vendorName);
            model.addAttribute("currentPage", page);
            model.addAttribute("totalPages", totalPages);
            model.addAttribute("sortBy", sortBy);
            model.addAttribute("sortOrder", sortOrder);
            
        } catch (Exception e) {
            model.addAttribute("error", "Unable to fetch transactions: " + e.getMessage());
            model.addAttribute("transactions", new ArrayList<>());
            model.addAttribute("vendorName", vendorName);
        }
        
        return "transactions_HR";
    }
    
    private List<Transaction_HR> sortTransactions(List<Transaction_HR> transactions, String sortBy, String sortOrder) {
        return transactions.stream()
            .sorted((t1, t2) -> {
                int comparison = 0;
                switch (sortBy) {
                    case "transactionId":
                        comparison = Long.compare(t1.getTransactionId(), t2.getTransactionId());
                        break;
                    case "deliveryAddressId":
                        comparison = Long.compare(t1.getDeliveryAddressId(), t2.getDeliveryAddressId());
                        break;
                    case "quantity":
                        comparison = Integer.compare(t1.getQuantity(), t2.getQuantity());
                        break;
                    case "createdAt":
                        if (t1.getCreatedAt() != null && t2.getCreatedAt() != null) {
                            comparison = t1.getCreatedAt().compareTo(t2.getCreatedAt());
                        }
                        break;
                }
                return sortOrder.equals("desc") ? -comparison : comparison;
            })
            .collect(Collectors.toList());
    }
}
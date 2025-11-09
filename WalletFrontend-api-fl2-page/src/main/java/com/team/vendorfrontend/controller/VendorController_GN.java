package com.team.vendorfrontend.controller;

import com.team.vendorfrontend.model.Vendor_GN;
import com.team.vendorfrontend.model.BranchSummary_GN;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class VendorController_GN {

    private final RestTemplate restTemplate = new RestTemplate();
//    private static final String BACKEND_URL = "http://localhost:8484/api/vendors";

    
    @Value("${backend.api.url}/api/vendors")
    private String BACKEND_URL;
    /**
     * Display vendor list page with search and pagination
     */
    @GetMapping("/vendors_GN")
    public String getVendors(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "") String search,
            Model model) {
        
        try {
            // Fetch all vendors from backend
            ResponseEntity<List<Vendor_GN>> response = restTemplate.exchange(
                BACKEND_URL,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Vendor_GN>>() {}
            );
            
            List<Vendor_GN> allVendors = response.getBody();
            
            if (allVendors == null) {
                allVendors = new ArrayList<>();
            }
            
            // Filter by search term
            List<Vendor_GN> filteredVendors = allVendors;
            if (search != null && !search.trim().isEmpty()) {
                String searchLower = search.toLowerCase().trim();
                filteredVendors = allVendors.stream()
                    .filter(v -> v.getVendorName() != null && 
                                v.getVendorName().toLowerCase().contains(searchLower))
                    .collect(Collectors.toList());
            }
            
            // Pagination
            int pageSize = 7;
            int totalVendors = filteredVendors.size();
            int totalPages = (int) Math.ceil((double) totalVendors / pageSize);
            
            if (page < 1) page = 1;
            if (page > totalPages && totalPages > 0) page = totalPages;
            
            int startIndex = (page - 1) * pageSize;
            int endIndex = Math.min(startIndex + pageSize, totalVendors);
            
            List<Vendor_GN> paginatedVendors = filteredVendors.subList(startIndex, endIndex);
            
            // Add attributes to model
            model.addAttribute("vendors", paginatedVendors);
            model.addAttribute("currentPage", page);
            model.addAttribute("totalPages", totalPages);
            model.addAttribute("search", search);
            model.addAttribute("memberName", "Ganesh");
            
        } catch (Exception e) {
            model.addAttribute("error", "Failed to fetch vendors: " + e.getMessage());
            model.addAttribute("vendors", new ArrayList<>());
            model.addAttribute("currentPage", 1);
            model.addAttribute("totalPages", 0);
        }
        
        return "vendors_GN";
    }

    /**
     * Display branch summary page for a specific vendor
     */
    @GetMapping("/branches_GN")
    public String getBranchSummary(
            @RequestParam Long vendorId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "branchId") String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder,
            Model model) {
        
        try {
            // Fetch vendor details
            ResponseEntity<Vendor_GN> vendorResponse = restTemplate.exchange(
                BACKEND_URL + "/" + vendorId,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Vendor_GN>() {}
            );
            
            Vendor_GN vendor = vendorResponse.getBody();
            
            // Fetch branch summary
            String branchUrl = BACKEND_URL + "/branch-summary/by-vendor?vendorId=" + vendorId;
            ResponseEntity<List<BranchSummary_GN>> response = restTemplate.exchange(
                branchUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<BranchSummary_GN>>() {}
            );
            
            List<BranchSummary_GN> allBranches = response.getBody();
            
            if (allBranches == null) {
                allBranches = new ArrayList<>();
            }
            
            // Sort branches
            allBranches = sortBranches(allBranches, sortBy, sortOrder);
            
            // Pagination
            int pageSize = 10;
            int totalBranches = allBranches.size();
            int totalPages = (int) Math.ceil((double) totalBranches / pageSize);
            
            if (page < 1) page = 1;
            if (page > totalPages && totalPages > 0) page = totalPages;
            
            int startIndex = (page - 1) * pageSize;
            int endIndex = Math.min(startIndex + pageSize, totalBranches);
            
            List<BranchSummary_GN> paginatedBranches = allBranches.subList(startIndex, endIndex);
            
            // Add attributes to model
            model.addAttribute("branches", paginatedBranches);
            model.addAttribute("vendorId", vendorId);
            model.addAttribute("vendorName", vendor != null ? vendor.getVendorName() : "Unknown");
            model.addAttribute("currentPage", page);
            model.addAttribute("totalPages", totalPages);
            model.addAttribute("sortBy", sortBy);
            model.addAttribute("sortOrder", sortOrder);
            model.addAttribute("totalBranches", totalBranches);
            
        } catch (Exception e) {
            model.addAttribute("error", "Failed to fetch branch summary: " + e.getMessage());
            model.addAttribute("branches", new ArrayList<>());
            model.addAttribute("currentPage", 1);
            model.addAttribute("totalPages", 0);
            model.addAttribute("vendorId", vendorId);
            model.addAttribute("vendorName", "Unknown");
        }
        
        return "branches_GN";
    }

    /**
     * Sort branches based on column and order
     */
    private List<BranchSummary_GN> sortBranches(List<BranchSummary_GN> branches, String sortBy, String sortOrder) {
        Comparator<BranchSummary_GN> comparator = null;
        
        switch (sortBy) {
            case "branchId":
                comparator = Comparator.comparing(BranchSummary_GN::getBranchId);
                break;
            case "branchName":
                comparator = Comparator.comparing(b -> b.getBranchName() != null ? b.getBranchName() : "");
                break;
            case "quantity":
                comparator = Comparator.comparing(b -> b.getQuantity() != null ? b.getQuantity() : 0.0);
                break;
            default:
                comparator = Comparator.comparing(BranchSummary_GN::getBranchId);
        }
        
        if ("desc".equalsIgnoreCase(sortOrder)) {
            comparator = comparator.reversed();
        }
        
        return branches.stream()
                      .sorted(comparator)
                      .collect(Collectors.toList());
    }
}
package com.team.vendorfrontend.controller;

import com.team.vendorfrontend.model.User_KM;
import com.team.vendorfrontend.model.TransactionQuantity_KM;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class PhysicalGoldController_KM {

    private final RestTemplate restTemplate = new RestTemplate();
//    private static final String BACKEND_URL = "http://localhost:8484/api/users";

    @Value("${backend.api.url}/api/users")
    private String BACKEND_URL;
    /**
     * Display users list page with pagination and search
     */
    @GetMapping("/users_KM")
    public String getUsers(@RequestParam(defaultValue = "1") int page,
                           @RequestParam(defaultValue = "") String search,
                           Model model) {
        try {
            String url = BACKEND_URL;
            User_KM[] usersArray = restTemplate.getForObject(url, User_KM[].class);
            List<User_KM> allUsers = (usersArray != null) ? Arrays.asList(usersArray) : List.of();
            
            // Filter by search term
            List<User_KM> filteredUsers = allUsers;
            if (search != null && !search.trim().isEmpty()) {
                String searchLower = search.toLowerCase().trim();
                filteredUsers = allUsers.stream()
                    .filter(u -> u.getName() != null && 
                                u.getName().toLowerCase().contains(searchLower))
                    .collect(Collectors.toList());
            }
            
            // Pagination
            int pageSize = 7;
            int totalUsers = filteredUsers.size();
            int totalPages = (int) Math.ceil((double) totalUsers / pageSize);
            
            if (page < 1) page = 1;
            if (page > totalPages && totalPages > 0) page = totalPages;
            
            int startIndex = (page - 1) * pageSize;
            int endIndex = Math.min(startIndex + pageSize, totalUsers);
            
            List<User_KM> paginatedUsers = filteredUsers.subList(startIndex, endIndex);
            
            model.addAttribute("users", paginatedUsers.toArray(new User_KM[0]));
            model.addAttribute("currentPage", page);
            model.addAttribute("totalPages", totalPages);
            model.addAttribute("search", search);
            
        } catch (Exception e) {
            model.addAttribute("error", "Failed to fetch users: " + e.getMessage());
            model.addAttribute("users", new User_KM[0]);
            model.addAttribute("currentPage", 1);
            model.addAttribute("totalPages", 0);
            model.addAttribute("search", search);
        }
        
        return "users_KM";
    }

    /**
     * Display physical gold transactions for a specific user
     */
    @GetMapping("/transactions_KM")
    public String showTransactions(@RequestParam String name, Model model) {
        try {
            String url = BACKEND_URL + "/physical-transactions/quantities-by-name?name=" + name;
            TransactionQuantity_KM[] txnArray = restTemplate.getForObject(url, TransactionQuantity_KM[].class);
            List<TransactionQuantity_KM> transactions = (txnArray != null) ? Arrays.asList(txnArray) : List.of();
            
            model.addAttribute("transactions", transactions);
            model.addAttribute("username", name);
            
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "Failed to fetch transactions: " + e.getMessage());
            model.addAttribute("username", name);
        }
        
        return "transactions_KM";
    }
}
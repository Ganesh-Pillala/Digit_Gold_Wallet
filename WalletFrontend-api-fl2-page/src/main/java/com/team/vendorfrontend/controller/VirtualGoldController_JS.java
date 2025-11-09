package com.team.vendorfrontend.controller;

import com.team.vendorfrontend.model.User_JS;
import com.team.vendorfrontend.model.VirtualGoldHolding_JS;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class VirtualGoldController_JS {

    private final RestTemplate restTemplate = new RestTemplate();
//    private static final String BACKEND_URL = "http://localhost:8484/api/user-gold";

    @Value("${backend.api.url}/api/user-gold")
    private String BACKEND_URL;
    /**
     * Display users list page with pagination and search
     */
    @GetMapping("/users_JS")
    public String getUsers(@RequestParam(defaultValue = "1") int page,
                           @RequestParam(defaultValue = "") String search,
                           Model model) {
        try {
            String url = BACKEND_URL + "/users";
            User_JS[] allUsersArray = restTemplate.getForObject(url, User_JS[].class);
            List<User_JS> allUsers = (allUsersArray != null) ? Arrays.asList(allUsersArray) : List.of();

            // Filter by search term
            List<User_JS> filteredUsers = allUsers;
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
            
            List<User_JS> paginatedUsers = (startIndex < totalUsers) ? 
                    filteredUsers.subList(startIndex, endIndex) : List.of();

            model.addAttribute("users", paginatedUsers.toArray(new User_JS[0]));
            model.addAttribute("currentPage", page);
            model.addAttribute("totalPages", totalPages);
            model.addAttribute("search", search);

        } catch (Exception e) {
            model.addAttribute("error", "Failed to fetch users: " + e.getMessage());
            model.addAttribute("users", new User_JS[0]);
            model.addAttribute("currentPage", 1);
            model.addAttribute("totalPages", 0);
            model.addAttribute("search", search);
        }

        return "users_JS";
    }

    /**
     * Display virtual gold holdings for a specific user
     */
    @GetMapping("/user_JS/{name}")
    public String getUserHoldings(@PathVariable String name, Model model) {
        try {
            String url = BACKEND_URL + "/holdings-by-name?name=" + name;
            VirtualGoldHolding_JS[] holdings = restTemplate.getForObject(url, VirtualGoldHolding_JS[].class);

            model.addAttribute("name", name);
            model.addAttribute("holdings", holdings != null ? holdings : new VirtualGoldHolding_JS[0]);

        } catch (Exception e) {
            model.addAttribute("error", "Failed to fetch holdings: " + e.getMessage());
            model.addAttribute("name", name);
            model.addAttribute("holdings", new VirtualGoldHolding_JS[0]);
        }

        return "virtualgoldholdings_JS";
    }
}
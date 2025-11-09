package com.team.vendorfrontend.controller;

import com.team.vendorfrontend.model.User_JG;
import com.team.vendorfrontend.model.Address_JG;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class UsersController_JG {

    private final RestTemplate restTemplate = new RestTemplate();
//    private static final String BACKEND_URL = "http://localhost:8484/api/jagat/users";
    
    @Value("${backend.api.url}/api/jagat/users")
    private String BACKEND_URL;
    /**
     * Display users list page with pagination and search
     */
    @GetMapping("/users_JG")
    public String getUsers(@RequestParam(defaultValue = "1") int page,
                           @RequestParam(defaultValue = "") String search,
                           Model model) {
        try {
            // Fetch all users from backend
            ResponseEntity<List<User_JG>> response = restTemplate.exchange(
                BACKEND_URL,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<User_JG>>() {}
            );

            List<User_JG> allUsers = response.getBody();
            if (allUsers == null) allUsers = new ArrayList<>();

            // Search filter (by name, email, etc.)
            List<User_JG> filteredUsers = allUsers;
            if (search != null && !search.trim().isEmpty()) {
                String searchLower = search.toLowerCase();
                filteredUsers = allUsers.stream()
                    .filter(u ->
                        (u.getName() != null && u.getName().toLowerCase().contains(searchLower)) ||
                        (u.getEmail() != null && u.getEmail().toLowerCase().contains(searchLower))
                    )
                    .collect(Collectors.toList());
            }

            // Pagination setup
            int pageSize = 8;
            int totalUsers = filteredUsers.size();
            int totalPages = (int) Math.ceil((double) totalUsers / pageSize);
            if (totalPages == 0) totalPages = 1; // avoid divide by zero

            if (page < 1) page = 1;
            if (page > totalPages) page = totalPages;

            int startIndex = (page - 1) * pageSize;
            int endIndex = Math.min(startIndex + pageSize, totalUsers);

            List<User_JG> paginatedUsers = filteredUsers.subList(startIndex, endIndex);

            // Add attributes to model
            model.addAttribute("users", paginatedUsers);
            model.addAttribute("currentPage", page);
            model.addAttribute("totalPages", totalPages);
            model.addAttribute("search", search);
            model.addAttribute("memberName", "Jagat");

            // Debug info (you can remove later)
            System.out.println("Total Users: " + totalUsers);
            System.out.println("Total Pages: " + totalPages);
            System.out.println("Current Page: " + page);
            System.out.println("Paginated Users Count: " + paginatedUsers.size());

        } catch (Exception e) {
            model.addAttribute("error", "Failed to fetch users: " + e.getMessage());
            model.addAttribute("users", new ArrayList<>());
            model.addAttribute("currentPage", 1);
            model.addAttribute("totalPages", 1);
            model.addAttribute("search", search);
        }

        return "users_JG";
    }

    /**
     * Display address details for a specific user
     */
    @GetMapping("/address_JG/{name}")
    public String getAddressByName(@PathVariable String name, Model model) {
        try {
            // Fetch address by user name
            String addressUrl = BACKEND_URL + "/address/by-name/" + name;
            ResponseEntity<Address_JG> response = restTemplate.exchange(
                addressUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Address_JG>() {}
            );

            Address_JG address = response.getBody();
            model.addAttribute("address", address);
            model.addAttribute("userName", name);

        } catch (Exception e) {
            model.addAttribute("error", "Failed to fetch address: " + e.getMessage());
            model.addAttribute("address", null);
            model.addAttribute("userName", name);
        }

        return "address_JG";
    }
}

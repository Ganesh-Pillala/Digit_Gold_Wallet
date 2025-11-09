package com.team.vendorfrontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Arrays;
import java.util.List;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        List<TeamMember> teamMembers = Arrays.asList(
            new TeamMember("Harsh", "/vendors_HR"),
            new TeamMember("Abdullah", "/users_AB"),
            new TeamMember("Ganesh", "/vendors_GN"),
            new TeamMember("Jagat", "/users_JG"),
            new TeamMember("Joshika", "/users_JS"),
            new TeamMember("Deepika", "/users_DP"),
            new TeamMember("Kiranmayee", "/users_KM")
        );

        model.addAttribute("teamMembers", teamMembers);
        model.addAttribute("projectName", "Digital Gold Wallet");
        model.addAttribute("projectTagline", "Digital Gold Wallet Management System");

        return "index";
    }

    // Inner class for team member data - Simplified (no contribution field)
    public static class TeamMember {
        private String name;
        private String link;

        public TeamMember(String name, String link) {
            this.name = name;
            this.link = link;
        }

        public String getName() { 
            return name; 
        }
        
        public String getLink() { 
            return link; 
        }
    }
}
package com.company.quiz.Models;

import lombok.Builder;

@Builder
public class JwtResponse {

    private String jwtToken;
    private String username;
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public JwtResponse(String token, String username,String name) {
        this.jwtToken = token;
        this.username = username;
        this.name = name;
    }


}

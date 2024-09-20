package com.UserManagement.DTO;

import com.UserManagement.Entity.Users;
import lombok.Data;

import java.util.List;

@Data
public class ReqRes {
    private Integer statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String name;
    private String city;
    private String role;
    private String password;
    private String email;
    private Users users;
    private List<Users> usersList;


}

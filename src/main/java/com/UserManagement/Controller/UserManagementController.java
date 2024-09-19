package com.UserManagement.Controller;

import com.UserManagement.DTO.ReqRes;
import com.UserManagement.Service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserManagementController {
    @Autowired
    private UserManagementService userManagementService;

    @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes request){
        return ResponseEntity.ok(userManagementService.register(request));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes request){
        return ResponseEntity.ok(userManagementService.login(request));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes request){
        return ResponseEntity.ok(userManagementService.refreshToken(request));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<ReqRes> getAllUsers(){
        return ResponseEntity.ok(userManagementService.getAllUsers());
    }

    @GetMapping("/admin/get-user/{userId}")
    public ResponseEntity<ReqRes> getAllUsers(@PathVariable Integer userId){
        return ResponseEntity.ok(userManagementService.getuserById(userId));
    }

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<ReqRes> deleteUser(@PathVariable Integer userId){
        return ResponseEntity.ok(userManagementService.deleteByUserId(userId));
    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<ReqRes> updateuser(@PathVariable Integer userId,@RequestBody ReqRes reqRes){
        return ResponseEntity.ok(userManagementService.updateUser(userId,reqRes));
    }

    @GetMapping("/adminUser/get-profile")
    public ResponseEntity<ReqRes> getProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes res=userManagementService.getMyInfo(email);
        return ResponseEntity.status(res.getStatusCode()).body(res);
    }
}

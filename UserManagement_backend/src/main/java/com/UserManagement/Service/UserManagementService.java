package com.UserManagement.Service;

import com.UserManagement.DTO.ReqRes;
import com.UserManagement.Entity.Users;
import com.UserManagement.Repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserManagementService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public ReqRes register(ReqRes registrationRequest){
        ReqRes res=new ReqRes();

        try{
            Users user=new Users();
            user.setName(registrationRequest.getName());
            user.setEmail(registrationRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            user.setRole(registrationRequest.getRole());
            user.setCity(registrationRequest.getCity());

            Users ourUser=userRepository.save(user);

            if(ourUser.getId()>0){
                res.setUsers(ourUser);
                res.setMessage("User is created ....");
                res.setStatusCode(200);
            }
        }
        catch (Exception e){
            res.setStatusCode(500);
            res.setError(e.getMessage());
        }
        return res;
    }

    public ReqRes login(ReqRes loginRequest){
        ReqRes res=new ReqRes();

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword()));
            Users user=userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
            String token=jwtUtils.generateToken(user);
            String refreshtoken=jwtUtils.generateRefreshToken(new HashMap<>(),user);
            res.setStatusCode(200);
            res.setToken(token);
            res.setRole(user.getRole());
            res.setRefreshToken(token);
            res.setExpirationTime("24Hrs");
            res.setMessage("Successfully logged in");
        }
        catch (Exception e){
            res.setStatusCode(500);
            res.setError(e.getMessage());
        }
        return res;
    }

    public ReqRes refreshToken(ReqRes token){
        ReqRes res=new ReqRes();

        try{
           String email=jwtUtils.extractUserName(token.getToken());
           Users user=userRepository.findByEmail(email).orElseThrow();

           if(jwtUtils.isTokenValid(token.getToken(),user)){
               String jwtToken=jwtUtils.generateToken(user);
               res.setStatusCode(200);
               res.setToken(jwtToken);
               res.setRefreshToken(token.getRefreshToken());
               res.setExpirationTime("24Hrs");
               res.setMessage("Successfully refreshed");
           }
        }
        catch (Exception e){
            res.setStatusCode(500);
            res.setError(e.getMessage());
        }
        return res;
    }

    public ReqRes getAllUsers(){
        ReqRes res=new ReqRes();
        try{
            List<Users> result=userRepository.findAll();
            if(!result.isEmpty()){
                res.setUsersList(result);
                res.setStatusCode(200);
                res.setMessage("Successful");
            }
            else{
                res.setStatusCode(404);
                res.setError("No User Found");
            }
        }
        catch (Exception e){
            res.setStatusCode(500);
            res.setError("error occurred "+e.getMessage());
        }
        return res;
    }

    public ReqRes getuserById(Integer id){
        ReqRes res=new ReqRes();
        try{
            Users users=userRepository.findById(id).orElseThrow();
            res.setUsers(users);
            res.setStatusCode(200);
            res.setMessage("Successfully found user with id:"+id);
        }
        catch (Exception e){
            res.setStatusCode(500);
            res.setError("error occured "+e.getMessage());
        }
        return res;
    }

    public ReqRes deleteByUserId(Integer id){
        ReqRes res=new ReqRes();
        try{
            Optional<Users> users=userRepository.findById(id);
            if(users.isPresent()){
                userRepository.deleteById(id);
                res.setStatusCode(200);
                res.setMessage("Successfully user deleted");
            }
            else{
                res.setStatusCode(404);
                res.setError("No User Found");
            }
        }
        catch (Exception e){
            res.setStatusCode(500);
            res.setError("errro occured "+e.getMessage());
        }
        return res;
    }

    public ReqRes updateUser(Integer id, ReqRes updateUser){
        ReqRes res=new ReqRes();
        try{
            Optional<Users> users=userRepository.findById(id);
            if(users.isPresent()){
                Users user=users.get();
                user.setEmail(updateUser.getEmail());
                user.setName(updateUser.getName());
                user.setCity(updateUser.getCity());
                user.setRole(updateUser.getRole());

                if(updateUser.getPassword()!=null || !updateUser.getPassword().isEmpty()){
                    user.setPassword(passwordEncoder.encode(updateUser.getPassword()));
                }
                Users saveduser=userRepository.save(user);
                res.setUsers(saveduser);
                res.setStatusCode(200);
                res.setMessage("Successfully user updated");
            }
            else{
                res.setStatusCode(404);
                res.setError("No User updated");
            }
        }
        catch (Exception e){
            res.setStatusCode(500);
            res.setError("error occurred "+e.getMessage());
        }
        return res;
    }

    public ReqRes getMyInfo(String email) {
        ReqRes res = new ReqRes();
        try {
            Optional<Users> users = userRepository.findByEmail(email);

            if (users.isPresent()) {
                Users user = users.get();
                res.setUsers(user);
                res.setStatusCode(200);
                res.setMessage("Successful");
            }
            else{
                res.setStatusCode(404);
                res.setError("No User found");
            }
        } catch (Exception e) {
            res.setStatusCode(500);
            res.setError("errro occured " + e.getMessage());
        }
        return res;
    }
}

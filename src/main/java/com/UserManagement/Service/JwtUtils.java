package com.UserManagement.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Component
public class JwtUtils {
    public JwtUtils(){
        String secretString="4bb6d1dfbafb64a681139d1586b6f1160d18159afd57c8c79136d7490630407c";
        byte []keyByte= Base64.getDecoder().decode(secretString.getBytes(StandardCharsets.UTF_8));
        this.key=new SecretKeySpec(keyByte,"HmacSHA256");
    }

    private SecretKey key;
    @Value("${application.security.jwt.access-token-expiration}")
    private long accessTokenExpire;

    @Value("${application.security.jwt.refresh-token-expiration}")
    private long refreshTokenExpire;


    public String generateToken(UserDetails userDetails){
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+accessTokenExpire))
                .signWith(key)
                .compact();
    }
    public String generateRefreshToken(HashMap<String,Object> claims, UserDetails userDetails){
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .claims(claims)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+refreshTokenExpire))
                .signWith(key)
                .compact();
    }

    public String extractUserName(String token){
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims,T>claimsTFunction){
        return claimsTFunction.apply(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
    }
    public boolean isTokenValid(String token, UserDetails userdetails){
        final String username=extractUserName(token);
        return (username.equals(userdetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractClaims(token,Claims::getExpiration).before(new Date());
    }


}

package com.danny.MoneyManagerApplication.util;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    // 🔐 Secret key for signing (keep it safe, e.g. in environment variable) it is random
    private static final String SECRET_KEY = "oJ8jwrnVxSTx7+DzY7IhfqZIV4QyR2bV1PVRzEcS5mk=";  // base64 version

    // ✅ Generate a JWT token
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    // ✅ Generate token with extra claims (custom data)
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extraClaims) // custom info like role, etc.
                .setSubject(userDetails.getUsername()) // username/email
                .setIssuedAt(new Date(System.currentTimeMillis())) // issue time
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 hours
                .signWith(getSignInKey(), SignatureAlgorithm.HS256) // sign using secret key
                .compact(); // create final token string
    }

    // ✅ Extract username (subject) from token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // ✅ Extract expiration date
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // ✅ Generic claim extractor
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // ✅ Check if token is valid
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    // ✅ Check if token is expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // ✅ Get all claims (the payload inside JWT)
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ✅ Decode the secret key
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

public String generateToken(String email) {
    Map<String, Object> claims = new HashMap<>(); // empty claims (you can add custom ones if needed)

    return Jwts.builder()
            .setClaims(claims)                       // optional: add custom data
            .setSubject(email)                       // email = subject of the token
            .setIssuedAt(new Date(System.currentTimeMillis()))  // issue time
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // valid for 24 hours
            .signWith(getSignInKey(), SignatureAlgorithm.HS256) // use secret key
            .compact();                               // build final token string
}


  
}


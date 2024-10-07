package com.example.reciperadar.config;

import com.example.reciperadar.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final HandlerExceptionResolver handlerExceptionResolver;

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserDetailsService userDetailsService,
            HandlerExceptionResolver handlerExceptionResolver
    ) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.handlerExceptionResolver = handlerExceptionResolver;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");

        // Log the incoming request and header
        System.out.println("Request URI: " + request.getRequestURI());
        System.out.println("Authorization Header: " + authHeader);

        // Check for missing or malformed Authorization header
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("No JWT found or invalid format. Skipping filter.");
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // Extract the JWT from the Authorization header
            final String jwt = authHeader.substring(7);
            System.out.println("JWT Token: " + jwt);

            // Extract the username/email from the token
            final String userEmail = jwtService.extractUsername(jwt);
            System.out.println("Extracted username/email from JWT: " + userEmail);

            // Check existing authentication context
            Authentication currentAuth = SecurityContextHolder.getContext().getAuthentication();
            System.out.println("Current SecurityContext Authentication: " + currentAuth);

            // Proceed only if the user is not already authenticated
            if (userEmail != null && currentAuth == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                System.out.println("Loaded UserDetails for username: " + userDetails.getUsername());

                // Validate the JWT against the user details
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    System.out.println("JWT is valid for user: " + userDetails.getUsername());

                    // Create and set the authentication token in the SecurityContext
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("SecurityContext set with Authentication for: " + userDetails.getUsername());
                } else {
                    System.out.println("Invalid JWT token for user: " + userDetails.getUsername());
                }
            } else if (userEmail == null) {
                System.out.println("JWT does not contain a valid username/email.");
            } else {
                System.out.println("User already authenticated: " + currentAuth.getName());
            }

            // Proceed with the filter chain
            filterChain.doFilter(request, response);
        } catch (UsernameNotFoundException e) {
            System.out.println("Username not found: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        } catch (Exception exception) {
            System.out.println("Exception during JWT processing: " + exception.getMessage());
            exception.printStackTrace();
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }
    }

}
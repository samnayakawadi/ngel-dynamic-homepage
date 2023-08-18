package com.ModelContent.modelContent.config.keycloak;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class KeycloakConfig {

    private String userId;
    private String userCurrentRole;
    private List<String> userAllRoles;
    private String userFullName;
    private String userToken;

    public KeycloakConfig() {
        KeycloakPrincipal<KeycloakSecurityContext> principal = (KeycloakPrincipal<KeycloakSecurityContext>) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        this.userId = principal.getName();
        this.userCurrentRole = principal.getKeycloakSecurityContext().getToken().getResourceAccess("reactclient")
                .getRoles()
                .iterator().next();
        this.userFullName = principal.getKeycloakSecurityContext().getToken().getName();
        KeycloakSecurityContext securityContext = principal.getKeycloakSecurityContext();
        this.userToken = securityContext.getTokenString();
        // Get the set of roles
        Set<String> rolesSet = securityContext.getToken().getResourceAccess("reactclient").getRoles();
        // Convert the set to a list
        this.userAllRoles = new ArrayList<>(rolesSet);

    }

    public KeycloakConfig(String userId, String userCurrentRole, List<String> userAllRoles, String userFullName,
            String userToken) {
        this.userId = userId;
        this.userCurrentRole = userCurrentRole;
        this.userAllRoles = userAllRoles;
        this.userFullName = userFullName;
        this.userToken = userToken;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserCurrentRole() {
        return this.userCurrentRole;
    }

    public void setUserCurrentRole(String userCurrentRole) {
        this.userCurrentRole = userCurrentRole;
    }

    public List<String> getUserAllRoles() {
        return this.userAllRoles;
    }

    public void setUserAllRoles(List<String> userAllRoles) {
        this.userAllRoles = userAllRoles;
    }

    public String getUserFullName() {
        return this.userFullName;
    }

    public void setUserFullName(String userFullName) {
        this.userFullName = userFullName;
    }

    public String getUserToken() {
        return this.userToken;
    }

    public void setUserToken(String userToken) {
        this.userToken = userToken;
    }

}

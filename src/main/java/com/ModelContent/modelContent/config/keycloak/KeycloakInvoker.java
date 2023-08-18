package com.ModelContent.modelContent.config.keycloak;

public class KeycloakInvoker {

    private static KeycloakConfig keyclaokConfig;

    public static void createKeycloakConfigObject() {
        keyclaokConfig = new KeycloakConfig();
    }

    public static KeycloakConfig getKeycloakConfig() {
        createKeycloakConfigObject();
        return keyclaokConfig;
    }

}

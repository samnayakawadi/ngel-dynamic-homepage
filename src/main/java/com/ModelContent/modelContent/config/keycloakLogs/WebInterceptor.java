package com.ModelContent.modelContent.config.keycloakLogs;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.ModelContent.modelContent.config.keycloak.KeycloakInvoker;

@Component
public class WebInterceptor implements HandlerInterceptor {

    private static Logger logger = org.slf4j.LoggerFactory.getLogger(WebInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        DateFormat obj = new SimpleDateFormat("dd MMM yyyy HH:mm:ss:SSS Z");
        Date date = new Date(request.getSession().getCreationTime());

        String token = request.getHeader("Authorization");

        if (token == null) {
            return true;
        }

        else {
            String userId = KeycloakInvoker.getKeycloakConfig().getUserId();

            String dateCreating = obj.format(date);

            String userInfo = dateCreating + " " + userId + " " + " " + request.getRemoteAddr() + " "
                    + request.getRequestURI();

            logger.info(userInfo);

            // System.out.println(td.getEmailId());
            // System.out.println(td.getName());
            // System.out.println(dateCreating);

            // System.out.println("getRemotePort == " + request.getRemotePort());
            // System.out.println("getSession == " + request.getSession());
            // System.out.println("getSession().getId() == " +
            // request.getSession().getId());
            // System.out.println("getSession().getCreationTime() == " +
            // request.getSession().getCreationTime());
            // System.out.println("getSession().getLastAccessedTime() == " +
            // request.getSession().getLastAccessedTime());

            // System.out.println("getRequestURL == " + request.getRequestURL());
            // System.out.println("getLocalAddr == " + request.getLocalAddr());
            // System.out.println("getLocalName == " + request.getLocalName());
            // System.out.println("getRemoteAddr == " + request.getRemoteAddr());
            // System.out.println("getRequestURL == " + request.getRequestURL());
            // System.out.println("request.getContextPath() == " +
            // request.getContextPath());
            // System.out.println("request.getProtocol() == " + request.getProtocol());
            // System.out.println("getRequestURI == " + request.getRequestURI());
            // System.out.println("getRequestURI == " + request.getServerName());
            // System.out.println("getRequestURI == " + request.getServerPort());

            return true;

        }

    }

}

// package com.ModelContent.modelContent.config;

// import org.springframework.boot.web.reactive.function.client.WebClientCustomizer;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.client.reactive.ReactorClientHttpConnector;
// import org.springframework.web.reactive.function.client.WebClient;

// import io.netty.handler.timeout.WriteTimeoutHandler;
// import reactor.netty.http.client.HttpClient;
// import reactor.netty.resources.ConnectionProvider;
// import java.time.Duration;

// @Configuration
// public class GeneralConfig {
//      @Bean
//     public WebClientCustomizer webClientCustomizer() {
//         return webClientBuilder -> {
//             HttpClient httpClient = HttpClient.create(ConnectionProvider.newConnection())
//                     .responseTimeout(Duration.ofSeconds(30))
//                     .doOnResponse((res, conn) -> conn.addHandlerLast(new WriteTimeoutHandler(30)))
//                     .wiretap(true)
//                     .maxInboundMessageSize(10 * 1024 * 1024); // 10 MB

//             webClientBuilder.clientConnector(new ReactorClientHttpConnector(httpClient));
//         };
//     }
// }

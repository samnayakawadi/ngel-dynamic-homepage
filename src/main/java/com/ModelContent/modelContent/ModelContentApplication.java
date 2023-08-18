package com.ModelContent.modelContent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class ModelContentApplication {

	public static void main(String[] args) {
		SpringApplication.run(ModelContentApplication.class, args);
	}

}

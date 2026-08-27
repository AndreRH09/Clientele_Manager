package tech.getArray.employeemanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@SpringBootApplication
public class EmployeemanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeemanagerApplication.class, args);
	}

	@Bean
	public CorsFilter corsFilter() {
		// Create a new CorsConfiguration object
		CorsConfiguration config = new CorsConfiguration();

		// Allow credentials like cookies, authorization headers, or TLS client
		// certificates
		config.setAllowCredentials(true);

		// Specify the list of allowed origins that can access the application
		// Your front-end URLs only
		config.setAllowedOrigins(Arrays.asList("http://localhost:4200", // Frontend development server (e.g., Angular
				// app)
				"https://yourdomain.com" // Production domain
		));

		// Allow Standard headers
		config.setAllowedHeaders(Arrays.asList("Authorization", // Authorization → for tokens (JWT, OAuth, etc.)
				"Cache-Control", // Cache-Control → browser cache behavior
				"Content-Type", // Content-Type → like application/json
				"X-Requested-With", // X-Requested-With → for Ajax requests (especially legacy)
				"Accept", // Accept → what response formats are acceptable (application/json, etc.)
				"Origin" // Origin → original domain of request (used internally)
		));

		// Specify the HTTP methods that are allowed
		config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"));

		// Create a source that maps URL patterns to CORS configurations
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

		// Register the CORS configuration to apply to all paths (/** means all
		// endpoints)
		source.registerCorsConfiguration("/**", config);

		// Return the CorsFilter with the configured source
		return new CorsFilter(source);
	}
}


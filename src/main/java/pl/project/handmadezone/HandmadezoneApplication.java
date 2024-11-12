package pl.project.handmadezone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HandmadezoneApplication {

	public static void main(String[] args) {
		SpringApplication.run(HandmadezoneApplication.class, args);

		var sum = new Sum();

		System.out.println(sum.add(3, 5));
	}

}

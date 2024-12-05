package pl.project.handmadezone.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.project.handmadezone.api.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLogin(String login);
}
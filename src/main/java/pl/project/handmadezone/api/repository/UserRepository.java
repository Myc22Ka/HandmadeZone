package pl.project.handmadezone.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.project.handmadezone.api.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLogin(String login);
    Optional<User> findByEmail(String email);

    User findByFirstNameAndLastName(String userFirstName, String userLastName);
}
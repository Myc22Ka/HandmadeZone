package pl.project.handmadezone.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.project.handmadezone.api.model.User;

import java.util.List;

@Repository
public interface UsersRepository extends CrudRepository<User, Long> {

    List<User> findAllByOrderByIdAsc();
}

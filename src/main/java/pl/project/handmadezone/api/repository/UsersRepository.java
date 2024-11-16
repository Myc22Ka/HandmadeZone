package pl.project.handmadezone.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.project.handmadezone.api.model.Users;

import java.util.List;

@Repository
public interface UsersRepository extends CrudRepository<Users, Long> {

    List<Users> findAllByOrderByIdAsc();


}

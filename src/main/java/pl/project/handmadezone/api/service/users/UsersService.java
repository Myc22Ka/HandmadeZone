package pl.project.handmadezone.api.service.users;

import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.model.User;
import pl.project.handmadezone.api.repository.UsersRepository;

import java.util.List;

@Service
public class UsersService implements IUsersService {

    private final UsersRepository repository;

    public UsersService(UsersRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<User> findUser() {
        return repository.findAllByOrderByIdAsc();
    }

    @Override
    public User createUser(User user) {
        return  repository.save(user);
    }

    @Override
    public User updateUser(Long id, String name) {
        return repository.findById(id)
                .map(user -> {
                    user.setName(name);
                    return repository.save(user);
                })
                .orElse(null);
    }

    @Override
    public void deleteUser(Long id) {
        repository.deleteById(id);
    }
}

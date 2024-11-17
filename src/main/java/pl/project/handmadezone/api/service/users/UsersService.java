package pl.project.handmadezone.api.service.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.model.User;
import pl.project.handmadezone.api.repository.UsersRepository;

import java.util.List;

@Service
public class UsersService implements IUsersService{

    @Autowired
    private UsersRepository repository;

    @Override
    public List<User> find() {
        return repository.findAllByOrderByIdAsc();
    }

    @Override
    public User create(User users) {
        return repository.save(users);
    }

    @Override
    public User update(Long id, String name) {
        return repository.findById(id)
                .map(user -> {
                    user.setName(name);
                    return repository.save(user);
                })
                .orElse(null);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}

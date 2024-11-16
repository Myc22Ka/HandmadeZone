package pl.project.handmadezone.api.service.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.model.Users;
import pl.project.handmadezone.api.repository.UsersRepository;

import java.util.List;

@Service
public class UsersService implements IUsersService{

    @Autowired
    private UsersRepository repository;

    @Override
    public List<Users> find() {
        return repository.findAllByOrderByIdAsc();
    }

    @Override
    public Users create(Users users) {
        return repository.save(users);
    }

    @Override
    public Users update(Long id, String name) {
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

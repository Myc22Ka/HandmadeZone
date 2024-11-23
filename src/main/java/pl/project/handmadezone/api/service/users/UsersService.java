package pl.project.handmadezone.api.service.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.model.User;
import pl.project.handmadezone.api.repository.UsersRepository;

import java.util.List;

@Service
public class UsersService implements IUsersService{

    @Autowired
    private UsersRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> findUser() {
        return repository.findAllByOrderByIdAsc();
    }

    @Override
    public User createUser(User user) {
        System.out.println("Saving user: " + user); // Debug log
        User savedUser = repository.save(user);
        System.out.println("Saved user: " + savedUser); // Debug log
        return savedUser;
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

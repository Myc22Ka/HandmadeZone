package pl.project.handmadezone.api.service.users;

import pl.project.handmadezone.api.model.User;

import java.util.List;

public interface IUsersService {

    List<User> findUser();
    User createUser(User users);
    User updateUser(Long id, String name);
    void deleteUser(Long id);
}

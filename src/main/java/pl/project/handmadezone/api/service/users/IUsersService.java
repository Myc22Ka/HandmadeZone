package pl.project.handmadezone.api.service.users;

import pl.project.handmadezone.api.model.User;

import java.util.List;

public interface IUsersService {

    List<User> find();
    User create(User users);
    User update(Long id, String name);
    void delete(Long id);
}

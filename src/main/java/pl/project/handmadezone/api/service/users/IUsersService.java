package pl.project.handmadezone.api.service.users;

import pl.project.handmadezone.api.model.Users;

import java.util.List;

public interface IUsersService {

    List<Users> find();
    Users create(Users users);
    Users update(Long id, String name);
    void delete(Long id);
}

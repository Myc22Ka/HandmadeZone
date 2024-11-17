package pl.project.handmadezone.service;

import org.springframework.stereotype.Service;
import pl.project.handmadezone.api.model.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private List<User> userList;

    public UserService(){
        userList = new ArrayList<User>();

        User user1 = new User(1, "Ida", 32, "ida@gmail.com");
        User user2 = new User(2, "Tom", 25, "tom@gmail.com");
        User user3 = new User(3, "Sara", 28, "sara@gmail.com");
        User user4 = new User(4, "John", 35, "john@gmail.com");
        User user5 = new User(5, "Anna", 30, "anna@gmail.com");

        userList.addAll(Arrays.asList(user1, user2, user3, user4, user5));
    }

    public Optional<User> getUser(Long id){
        Optional optional = Optional.empty();

        for (User user : userList){
            if(id.equals(user.getId())){
                optional = Optional.of(user);
                return optional;
            }
        }
        return optional;
    }
}

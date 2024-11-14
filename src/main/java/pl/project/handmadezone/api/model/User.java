package pl.project.handmadezone.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class User {

    private int id;
    private String name;
    private int age;
    private String email;
}

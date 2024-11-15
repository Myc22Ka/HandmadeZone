package pl.project.handmadezone.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class User {

    private Integer id;
    private String name;
    private Integer age;
    private String email;
}

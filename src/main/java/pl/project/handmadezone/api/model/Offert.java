package pl.project.handmadezone.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public abstract class Offert {
    private Integer id;
    private Integer price;
    private String author;
    private String description;
    private String title;
}

package pl.project.handmadezone.api.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class Product {

    private Long id;
    private String category;
    private Double price;
    private String author;

}

package pl.project.handmadezone.api.model.measurements;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Dimensions {
    private Integer height;
    private Integer width;
    private Integer depth;
    private String unit;
}

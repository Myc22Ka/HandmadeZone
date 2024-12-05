package pl.project.handmadezone.api.controller.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
}

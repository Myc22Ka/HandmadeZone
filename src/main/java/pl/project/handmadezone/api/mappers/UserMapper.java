package pl.project.handmadezone.api.mappers;

import pl.project.handmadezone.api.dtos.SignUpDto;
import pl.project.handmadezone.api.dtos.UserDto;
import pl.project.handmadezone.api.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface UserMapper {

    // Mapowanie z User do UserDto
    @Mapping(target = "token", ignore = true)
    UserDto toUserDto(User user);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "password", ignore = true)
    })
    User signUpToUser(SignUpDto signUpDto);
}

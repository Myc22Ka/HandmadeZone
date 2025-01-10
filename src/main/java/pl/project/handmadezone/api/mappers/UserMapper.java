package pl.project.handmadezone.api.mappers;

import org.mapstruct.Mapping;
import pl.project.handmadezone.api.dtos.SignUpDto;
import pl.project.handmadezone.api.dtos.UserDto;
import pl.project.handmadezone.api.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "token", ignore = true)
    UserDto toUserDto(User user);

    @Mapping(target = "email", source = "email" )
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "cash", ignore = true)
    User signUpToUser(SignUpDto signUpDto);
}

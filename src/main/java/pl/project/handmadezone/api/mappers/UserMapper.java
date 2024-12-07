package pl.project.handmadezone.api.mappers;

import pl.project.handmadezone.api.dtos.SignUpDto;
import pl.project.handmadezone.api.dtos.UserDto;
import pl.project.handmadezone.api.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "token", ignore = true)
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}
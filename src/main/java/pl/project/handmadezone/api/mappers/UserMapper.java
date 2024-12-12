package pl.project.handmadezone.api.mappers;

import pl.project.handmadezone.api.dtos.SignUpDto;
import pl.project.handmadezone.api.dtos.UserDto;
import pl.project.handmadezone.api.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    User signUpToUser(SignUpDto signUpDto);
}

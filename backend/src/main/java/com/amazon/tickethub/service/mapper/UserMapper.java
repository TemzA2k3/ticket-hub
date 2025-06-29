package com.amazon.tickethub.service.mapper;

import com.amazon.tickethub.dto.user.UserDTO;
import com.amazon.tickethub.entity.User;

public class UserMapper {

    public static UserDTO toDTO(User user) {
        if (user == null) return null;

        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setRoleName(user.getRole() != null ? user.getRole().name() : null);
        return dto;
    }


}

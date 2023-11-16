package br.com.rafael.parkingcontrol.dto;

import br.com.rafael.parkingcontrol.enums.UserRole;

public record RegisterDTO(String email, String password, UserRole role) {
}

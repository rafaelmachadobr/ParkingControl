package br.com.rafael.parkingcontrol.dto;

import br.com.rafael.parkingcontrol.model.User;

public record LoginResponseDTO(String token, User user) {
}

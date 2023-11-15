package br.com.rafael.parkingcontrol.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                title = "Sistema de Controle de Estacionamento",
                version = "1.0",
                description = "API REST para controle de estacionamento",
                contact = @Contact(
                        name = "Rafael",
                        url = "https://github.com/rafaelmachadobr/"
                ),
                license = @License(
                        name = "MIT License",
                        url = "https://opensource.org/license/mit/"
                ),
                termsOfService = "https://opensource.org/license/mit/"
        ),
        servers = @Server(
                url = "http://localhost:8080",
                description = "Servidor Local"
        )
)
public class OpenApiConfig {
}

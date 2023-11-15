package br.com.rafael.parkingcontrol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "cars")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Plate is mandatory")
    @Pattern(regexp = "^[A-Z]{3}-[0-9]{4}$", message = "Plate is invalid, use the format AAA-0000")
    private String plate;

    @Column(nullable = false)
    @NotBlank(message = "Model is mandatory")
    private String model;

    @Column(nullable = false)
    @NotBlank(message = "Color is mandatory")
    private String color;

    @Column(nullable = false)
    @NotBlank(message = "Brand is mandatory")
    private String brand;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @NotNull(message = "Owner is mandatory")
    private Owner owner;
}

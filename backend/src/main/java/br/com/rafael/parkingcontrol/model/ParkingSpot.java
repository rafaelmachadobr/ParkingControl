package br.com.rafael.parkingcontrol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "parking_spots")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParkingSpot {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    @NotNull(message = "Number is mandatory")
    @Min(value = 1, message = "Number must be greater than 0")
    private Integer number;

    @Column(nullable = false)
    @NotNull(message = "Is occupied is mandatory")
    private Boolean isOccupied = false;
}

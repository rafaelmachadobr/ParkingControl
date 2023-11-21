package br.com.rafael.parkingcontrol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity(name = "permanences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Permanence {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private Date entryTime = new Date();

    private Date exitTime;

    private Double totalValue;

    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    @NotNull(message = "Car is mandatory")
    private Car car;

    @ManyToOne
    @JoinColumn(name = "parking_spot_id", nullable = false)
    @NotNull(message = "Parking spot is mandatory")
    private ParkingSpot parkingSpot;
}

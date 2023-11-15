package br.com.rafael.parkingcontrol.repository;

import br.com.rafael.parkingcontrol.model.ParkingSpot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, String> {
    ParkingSpot findByNumber(Integer number);
    List<ParkingSpot> findByIsOccupied(Boolean isOccupied);
}
package br.com.rafael.parkingcontrol.repository;

import br.com.rafael.parkingcontrol.model.ParkingSpot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, String> {
    ParkingSpot findByNumber(Integer number);
}
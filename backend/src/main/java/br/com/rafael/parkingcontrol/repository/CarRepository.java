package br.com.rafael.parkingcontrol.repository;

import br.com.rafael.parkingcontrol.model.Car;
import br.com.rafael.parkingcontrol.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, String> {
    List<Car> findByOwnerId(String ownerId);
}
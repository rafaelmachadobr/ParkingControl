package br.com.rafael.parkingcontrol.service;

import br.com.rafael.parkingcontrol.model.Car;
import br.com.rafael.parkingcontrol.model.Owner;
import br.com.rafael.parkingcontrol.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepository carRepository;

    public List<Car> findAll() {
        return carRepository.findAll();
    }

    public Car findById(String id) {
        return carRepository.findById(id).orElse(null);
    }

    public List<Car> findByOwner(String ownerId) {
        return carRepository.findByOwnerId(ownerId);
    }

    public Car save(Car car) {
        return carRepository.save(car);
    }

    public Car update(String id, Car car) {
        Car carToUpdate = carRepository.findById(id).orElse(null);

        if (carToUpdate != null) {
            carToUpdate.setPlate(car.getPlate());
            carToUpdate.setModel(car.getModel());
            carToUpdate.setColor(car.getColor());
            carToUpdate.setBrand(car.getBrand());

            return carRepository.save(carToUpdate);
        }

        return null;
    }

    public void delete(String id) {
        carRepository.deleteById(id);
    }
}

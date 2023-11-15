package br.com.rafael.parkingcontrol.controller;

import br.com.rafael.parkingcontrol.model.Car;
import br.com.rafael.parkingcontrol.service.CarService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/cars")
@RequiredArgsConstructor
public class CarController {
    private final CarService carService;

    @GetMapping
    public ResponseEntity<List<Car>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(carService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Car> findById(@PathVariable String id) {
        Car car = carService.findById(id);

        if (car != null) {
            return ResponseEntity.status(HttpStatus.OK).body(car);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("owner/{ownerId}")
    public ResponseEntity<List<Car>> findByOwner(@PathVariable String ownerId) {
        return ResponseEntity.status(HttpStatus.OK).body(carService.findByOwner(ownerId));
    }

    @PostMapping
    public ResponseEntity<Car> save(@Valid @RequestBody Car car) {
        return ResponseEntity.status(HttpStatus.CREATED).body(carService.save(car));
    }

    @PutMapping("{id}")
    public ResponseEntity<Car> update(@PathVariable String id, @Valid @RequestBody Car car) {
        Car carUpdated = carService.update(id, car);

        if (carUpdated != null) {
            return ResponseEntity.status(HttpStatus.OK).body(carUpdated);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (carService.findById(id) != null) {
            carService.delete(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

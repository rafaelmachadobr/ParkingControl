package br.com.rafael.parkingcontrol.controller;

import br.com.rafael.parkingcontrol.model.ParkingSpot;
import br.com.rafael.parkingcontrol.service.ParkingSpotService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/parking-spots")
@RequiredArgsConstructor
public class ParkingSpotController {
    private final ParkingSpotService parkingSpotService;

    @GetMapping
    public ResponseEntity<List<ParkingSpot>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(parkingSpotService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<ParkingSpot> findById(@PathVariable String id) {
        ParkingSpot parkingSpot = parkingSpotService.findById(id);

        if (parkingSpot != null) {
            return ResponseEntity.status(HttpStatus.OK).body(parkingSpot);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("number/{number}")
    public ResponseEntity<ParkingSpot> findByNumber(@PathVariable Integer number) {
        ParkingSpot parkingSpot = parkingSpotService.findByNumber(number);

        if (parkingSpot != null) {
            return ResponseEntity.status(HttpStatus.OK).body(parkingSpot);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("is-occupied/{isOccupied}")
    public ResponseEntity<List<ParkingSpot>> findByIsOccupied(@PathVariable Boolean isOccupied) {
        List<ParkingSpot> parkingSpots = parkingSpotService.findByIsOccupied(isOccupied);

        if (parkingSpots != null) {
            return ResponseEntity.status(HttpStatus.OK).body(parkingSpots);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public ResponseEntity<ParkingSpot> save(@Valid @RequestBody ParkingSpot parkingSpot) {
        return ResponseEntity.status(HttpStatus.CREATED).body(parkingSpotService.save(parkingSpot));
    }

    @PutMapping("{id}")
    public ResponseEntity<ParkingSpot> update(@PathVariable String id, @Valid @RequestBody ParkingSpot parkingSpot) {
        ParkingSpot parkingSpotUpdated = parkingSpotService.update(id, parkingSpot);

        if (parkingSpotUpdated != null) {
            return ResponseEntity.status(HttpStatus.OK).body(parkingSpotUpdated);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (parkingSpotService.findById(id) != null) {
            parkingSpotService.delete(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

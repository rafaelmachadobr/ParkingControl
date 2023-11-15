package br.com.rafael.parkingcontrol.controller;


import br.com.rafael.parkingcontrol.handler.BusinessException;
import br.com.rafael.parkingcontrol.model.ParkingSpot;
import br.com.rafael.parkingcontrol.model.Permanence;
import br.com.rafael.parkingcontrol.service.ParkingSpotService;
import br.com.rafael.parkingcontrol.service.PermanenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/permanences")
@RequiredArgsConstructor
public class PermanenceController {
    private final PermanenceService permanenceService;
    private final ParkingSpotService parkingSpotService;

    @GetMapping
    public ResponseEntity<List<Permanence>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(permanenceService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Permanence> findById(@PathVariable String id) {
        Permanence permanence = permanenceService.findById(id);

        if (permanence != null) {
            return ResponseEntity.status(HttpStatus.OK).body(permanence);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("{id}/exit")
    public ResponseEntity<Permanence> performExit(@PathVariable String id) {
        Permanence permanence = permanenceService.performExit(id);

        if (permanence != null) {
            return ResponseEntity.status(HttpStatus.OK).body(permanence);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public ResponseEntity<Permanence> save(@RequestBody Permanence permanence) {
        String parkingSpotId = permanence.getParkingSpot().getId();

        ParkingSpot parkingSpot = parkingSpotService.findById(parkingSpotId);

        if (parkingSpot != null && !parkingSpot.getIsOccupied()) {
            parkingSpot.setIsOccupied(true);
            parkingSpotService.save(parkingSpot);

            return ResponseEntity.status(HttpStatus.CREATED).body(permanenceService.save(permanence));
        }

        throw new BusinessException("Parking spot is occupied");
    }

    @PutMapping("{id}")
    public ResponseEntity<Permanence> update(@PathVariable String id, @RequestBody Permanence permanence) {
        Permanence permanenceUpdated = permanenceService.update(id, permanence);

        if (permanenceUpdated != null) {
            return ResponseEntity.status(HttpStatus.OK).body(permanenceUpdated);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (permanenceService.findById(id) != null) {
            permanenceService.delete(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

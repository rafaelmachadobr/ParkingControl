package br.com.rafael.parkingcontrol.controller;

import br.com.rafael.parkingcontrol.model.Owner;
import br.com.rafael.parkingcontrol.service.OwnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/owners")
@RequiredArgsConstructor
public class OwnerController {
    private final OwnerService ownerService;

    @GetMapping
    public ResponseEntity<List<Owner>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(ownerService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Owner> findById(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(ownerService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Owner> save(@RequestBody Owner owner) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ownerService.save(owner));
    }

    @PutMapping("{id}")
    public ResponseEntity<Owner> update(@PathVariable String id, @RequestBody Owner owner) {
        if (ownerService.update(id, owner) != null) {
            return ResponseEntity.status(HttpStatus.OK).body(ownerService.update(id, owner));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteById(@PathVariable String id) {
        if (ownerService.findById(id) != null) {
            ownerService.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

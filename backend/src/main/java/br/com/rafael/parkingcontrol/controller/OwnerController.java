package br.com.rafael.parkingcontrol.controller;

import br.com.rafael.parkingcontrol.model.Owner;
import br.com.rafael.parkingcontrol.service.OwnerService;
import jakarta.validation.Valid;
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
        Owner owner = ownerService.findById(id);

        if (owner != null) {
            return ResponseEntity.status(HttpStatus.OK).body(owner);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public ResponseEntity<Owner> save(@Valid @RequestBody Owner owner) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ownerService.save(owner));
    }

    @PutMapping("{id}")
    public ResponseEntity<Owner> update(@PathVariable String id, @Valid @RequestBody Owner owner) {
        Owner ownerUpdated = ownerService.update(id, owner);

        if (ownerUpdated != null) {
            return ResponseEntity.status(HttpStatus.OK).body(ownerUpdated);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (ownerService.findById(id) != null) {
            ownerService.delete(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

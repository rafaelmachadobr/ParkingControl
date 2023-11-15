package br.com.rafael.parkingcontrol.repository;

import br.com.rafael.parkingcontrol.model.Permanence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermanenceRepository extends JpaRepository<Permanence, String> {
}
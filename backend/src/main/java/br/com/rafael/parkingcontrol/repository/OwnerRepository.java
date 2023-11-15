package br.com.rafael.parkingcontrol.repository;

import br.com.rafael.parkingcontrol.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, String> {
}
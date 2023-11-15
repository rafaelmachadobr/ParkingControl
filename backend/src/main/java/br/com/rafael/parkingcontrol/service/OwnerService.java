package br.com.rafael.parkingcontrol.service;

import br.com.rafael.parkingcontrol.model.Owner;
import br.com.rafael.parkingcontrol.repository.OwnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OwnerService {
    private final OwnerRepository ownerRepository;

    public List<Owner> findAll() {
        return ownerRepository.findAll();
    }

    public Owner findById(String id) {
        return ownerRepository.findById(id).orElse(null);
    }

    public Owner save(Owner owner) {
        return ownerRepository.save(owner);
    }

    public Owner update(String id, Owner owner) {
        Owner ownerToUpdate = ownerRepository.findById(id).orElse(null);

        if (ownerToUpdate != null) {
            ownerToUpdate.setFirstName(owner.getFirstName());
            ownerToUpdate.setLastName(owner.getLastName());
            ownerToUpdate.setEmail(owner.getEmail());
            ownerToUpdate.setPhone(owner.getPhone());

            return ownerRepository.save(ownerToUpdate);
        }

        return null;
    }

    public void delete(String id) {
        ownerRepository.deleteById(id);
    }
}

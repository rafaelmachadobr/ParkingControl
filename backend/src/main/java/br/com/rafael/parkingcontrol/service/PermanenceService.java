package br.com.rafael.parkingcontrol.service;

import br.com.rafael.parkingcontrol.model.Permanence;
import br.com.rafael.parkingcontrol.repository.PermanenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PermanenceService {
    private final PermanenceRepository permanenceRepository;

    public List<Permanence> findAll() {
        return permanenceRepository.findAll();
    }

    public Permanence findById(String id) {
        return permanenceRepository.findById(id).orElse(null);
    }

    public Permanence save(Permanence permanence) {
        return permanenceRepository.save(permanence);
    }

    public Permanence update(String id, Permanence permanence) {
        Permanence permanenceToUpdate = permanenceRepository.findById(id).orElse(null);

        if (permanenceToUpdate != null) {
            permanenceToUpdate.setEntryTime(permanence.getEntryTime());
            permanenceToUpdate.setExitTime(permanence.getExitTime());
            permanenceToUpdate.setTotalValue(permanence.getTotalValue());
            permanenceToUpdate.setCar(permanence.getCar());
            permanenceToUpdate.setParkingSpot(permanence.getParkingSpot());

            return permanenceRepository.save(permanenceToUpdate);
        }

        return null;
    }

    public void delete(String id) {
        permanenceRepository.deleteById(id);
    }

    public Permanence performExit(String id) {
        Permanence permanence = permanenceRepository.findById(id).orElse(null);

        if (permanence != null && permanence.getExitTime() == null) {
            permanence.setExitTime(new Date());

            Double totalValue = calculateTotalValue(permanence.getEntryTime(), permanence.getExitTime());
            permanence.setTotalValue(totalValue);

            return permanenceRepository.save(permanence);
        }

        return null;
    }

    private Double calculateTotalValue(Date entryTime, Date exitTime) {
        long diff = exitTime.getTime() - entryTime.getTime();
        long diffHours = diff / (60 * 60 * 1000);

        return diffHours * 5.0;
    }
}

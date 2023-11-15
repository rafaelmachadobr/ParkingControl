package br.com.rafael.parkingcontrol.service;

import br.com.rafael.parkingcontrol.model.ParkingSpot;
import br.com.rafael.parkingcontrol.repository.ParkingSpotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParkingSpotService {
    private final ParkingSpotRepository parkingSpotRepository;

    public List<ParkingSpot> findAll() {
        return parkingSpotRepository.findAll();
    }

    public ParkingSpot findById(String id) {
        return parkingSpotRepository.findById(id).orElse(null);
    }

    public ParkingSpot findByNumber(Integer number) {
        return parkingSpotRepository.findByNumber(number);
    }

    public List<ParkingSpot> findByIsOccupied(Boolean isOccupied) {
        return parkingSpotRepository.findByIsOccupied(isOccupied);
    }

    public ParkingSpot save(ParkingSpot parkingSpot) {
        return parkingSpotRepository.save(parkingSpot);
    }

    public ParkingSpot update(String id, ParkingSpot parkingSpot) {
        ParkingSpot parkingSpotToUpdate = parkingSpotRepository.findById(id).orElse(null);

        if (parkingSpotToUpdate != null) {
            parkingSpotToUpdate.setNumber(parkingSpot.getNumber());
            parkingSpotToUpdate.setIsOccupied(parkingSpot.getIsOccupied());

            return parkingSpotRepository.save(parkingSpotToUpdate);
        }

        return null;
    }

    public void delete(String id) {
        parkingSpotRepository.deleteById(id);
    }
}

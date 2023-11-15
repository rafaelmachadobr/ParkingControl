package br.com.rafael.parkingcontrol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "owners")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    @NotBlank(message = "First name is mandatory")
    private String firstName;

    @Column(nullable = false)
    @NotBlank(message = "Last name is mandatory")
    private String lastName;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email is invalid, use the format exemple@email.com")
    private String email;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Phone is mandatory")
    @Pattern(regexp = "^\\([1-9]{2}\\) [9]{1}[0-9]{4}-[0-9]{4}$", message = "Phone is invalid, use the format (99) 99999-9999")
    private String phone;
}

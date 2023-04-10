package com.quaefactahealth.vaxapp.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity
@Table(name = "userInformation")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Data
@Builder
public class UserInformation {

    @Id
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "firstName", columnDefinition = "TEXT")
    private String firstName;

    @Column(name = "lastName", columnDefinition = "TEXT")
    private String lastName;

    @Column(name = "gender", columnDefinition = "TEXT")
    private String gender;

    @Column(name = "DOB", columnDefinition = "TEXT")
    private String DOB;

    @Column(name = "address1", columnDefinition = "TEXT")
    private String address1;

    @Column(name = "address2", columnDefinition = "TEXT")
    private String address2;

    @Column(name = "postCode", columnDefinition = "TEXT")
    private String postCode;

    @Column(name = "country", columnDefinition = "TEXT")
    private String country;

    @Column(name = "state", columnDefinition = "TEXT")
    private String state;

    @Column(name = "phone", columnDefinition = "TEXT")
    private String phone;

    @Column(name = "email", columnDefinition = "TEXT")
    private String email;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "fk_user_id")
//    private User user;

    //    @OneToOne(mappedBy = "userInformation")
    //    private User user;
}
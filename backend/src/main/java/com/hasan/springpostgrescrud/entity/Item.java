package com.hasan.springpostgrescrud.entity;

import jakarta.persistence.*;
import lombok.*;

// import java.time.LocalDateTime;

@Entity
@Table(name = "items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer quantity;

    private Double price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}

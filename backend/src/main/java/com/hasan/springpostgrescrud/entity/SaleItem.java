package com.hasan.springpostgrescrud.entity;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "sale_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaleItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore   // ⭐ THIS breaks the infinite loop
    private Sale sale;

    @ManyToOne
    private Item item;

    private Integer quantity;
    private Double price;
}

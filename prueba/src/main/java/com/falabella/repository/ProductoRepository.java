package com.falabella.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.falabella.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long>{

}

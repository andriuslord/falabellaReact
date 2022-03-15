package com.falabella.controller;

import com.falabella.exception.ResourceNotFoundException;
import com.falabella.model.Producto;
import com.falabella.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ProductoController {

	@Autowired
	private ProductoRepository productoRepository;
	
	// get all productos
	@GetMapping("/productos")
	public List<Producto> getAllProductos(){
		return productoRepository.findAll();
	}		
	
	// create producto rest api
	@PostMapping("/productos")
	public Producto createProducto(@RequestBody Producto producto) {
		return productoRepository.save(producto);
	}
	
	// get producto by id rest api
	@GetMapping("/productos/{id}")
	public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
		Producto producto = productoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("producto not exist with id :" + id));
		return ResponseEntity.ok(producto);
	}
	
	// update producto rest api
	
	@PutMapping("/productos/{id}")
	public ResponseEntity<Producto> updateProducto(@PathVariable Long id, @RequestBody Producto productoDetails){
		Producto producto = productoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Producto not exist with id :" + id));
		producto.setProduct(productoDetails.getProduct());
		producto.setBrand(productoDetails.getBrand());
		producto.setSize(productoDetails.getSize());
		producto.setPrice(productoDetails.getPrice());
		producto.setImage(productoDetails.getImage());
		
		Producto updatedProducto = productoRepository.save(producto);
		return ResponseEntity.ok(updatedProducto);
	}
	
	// delete producto rest api
	@DeleteMapping("/productos/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteProducto(@PathVariable Long id){
		Producto producto = productoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Producto not exist with id :" + id));
		
		productoRepository.delete(producto);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}

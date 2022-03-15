import React, { Component } from 'react'

import ProductService from '../services/ProductService'

class ListProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                productos: []
        }
        this.addProducto = this.addProducto.bind(this);
        this.editProducto = this.editProducto.bind(this);
        this.deleteProducto = this.deleteProducto.bind(this);
    }
    deleteProducto(id){
        ProductService.deleteProducto(id).then( res => {
            this.setState({productos: this.state.productos.filter(producto => producto.id !== id)});
        });
    }
    viewProducto(id){
        this.props.history.push(`/view-producto/${id}`);
    }
    editProducto(id){
        this.props.history.push(`/add-producto/${id}`);
    }

    componentDidMount(){
       ProductService.getProductos().then((res) => {
            this.setState({ productos: res.data});
        });
    }

    addProducto(){
        this.props.history.push('/add-producto/_add');
    }

    render() {
        return (
            <div>
                <br></br>
                 <h2 className="text-center">Lista de Productos</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addProducto}> Nuevos Productos</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> SKU</th>
                                    <th> Nombre Producto</th>
                                    <th> Marca</th>
                                    <th> Size</th>
                                    <th> Price</th>
                                    <th> Image Url</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.productos.map(
                                        producto =>
                                        <tr key = {producto.id}>
                                             <td> {producto.id}</td>
                                             <td> {producto.product} </td>
                                             <td> {producto.brand}</td>
                                             <td> {producto.size}</td>
                                             <td> {producto.price} </td>
                                             <td> {producto.image}</td>
                                             <td>
                                                 <button onClick={ () => this.editProducto(producto.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteProducto(producto.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewProducto(producto.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListProductComponent

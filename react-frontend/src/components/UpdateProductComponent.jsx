import React, { Component } from 'react'
import ProductService from '../services/ProductService';

class UpdateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            product: '',
            brand: '',
            size: '',
            price: '',
            image: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeBrandHandler = this.changeBrandHandler.bind(this);
        this.changeSizeHandler = this.changeSizeHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeImageHandler = this.changeImageHandler.bind(this);
        this.updateProducto = this.updateProducto.bind(this);
    }

    componentDidMount(){
        ProductService.getProductoById(this.state.id).then( (res) =>{
            let producto = res.data;
            this.setState({product:producto.product,
                brand: producto.brand,
                price: producto.price,
                image : producto.image
            });
        });
    }

    updateProducto = (e) => {
        e.preventDefault();
        let producto = {product: this.state.product, brand: this.state.brand, size: this.state.size, price: this.state.price, image: this.state.image};
        console.log('producto => ' + JSON.stringify(producto));
        console.log('id => ' + JSON.stringify(this.state.id));
        ProductService.updateProducto(producto, this.state.id).then( res => {
            this.props.history.push('/productos');
        });
    }



    changeNameHandler= (event) => {
        this.setState({product: event.target.value});
    }

    changeBrandHandler= (event) => {
        this.setState({ brand: event.target.value});
    }

    changeSizeHandler= (event) => {
        this.setState({size: event.target.value});
    }
    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }
    changeImageHandler= (event) => {
        this.setState({image: event.target.value});
    }
    cancel(){
        this.props.history.push('/productos');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Producto</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Nombre Producto: </label>
                                            <input placeholder="Nombre Producto" name="product" className="form-control"
                                                   value={this.state.product} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Marca: </label>
                                            <input placeholder="Marca" name="brand" className="form-control"
                                                   value={this.state.brand} onChange={this.changeBrandHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Size: </label>
                                            <input placeholder="Size" name="Size" className="form-control"
                                                   value={this.state.size} onChange={this.changeSizeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="Price" className="form-control"
                                                   value={this.state.price} onChange={this.changePriceHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> image: </label>
                                            <input placeholder="image" name="image" className="form-control"
                                                   value={this.state.image} onChange={this.changeImageHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.updateProducto}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateProductComponent

import React, { Component } from 'react'
import ProductService from '../services/ProductService'

class ViewProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            producto: {}
        }
    }

    componentDidMount(){
        ProductService.getProductoById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View products Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Nombre Producto: </label>
                            <div> { this.state.producto.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> Marca: </label>
                            <div> { this.state.producto.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> Employee Email ID: </label>
                            <div> { this.state.producto.emailId }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewProductComponent

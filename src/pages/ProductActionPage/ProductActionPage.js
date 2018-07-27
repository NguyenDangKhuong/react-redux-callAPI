import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import callApi from './../../utils/apiCaller'
import { actAddProductRequest, actGetProductEdittingRequest } from './../../actions/index'
import { connect } from 'react-redux'

class ProductActionPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: ''
        }
    }

    componentDidMount() {
        let { match, product } = this.props
        if (match) {
            let id = match.params.id;
            this.props.onGetEdittingProduct(id)
            console.log(product);
            // this.setState({
            //     txtName: product.name,
            //     txtPrice: product.price,
            //     chkbStatus: product.status
            // })
        }
    }

    onChange = (e) => {
        let target = e.target
        let name = target.name
        let value = target.type === 'checkbox' ? target.checked : target.value
        this.setState({
            [name]: value
        })
    }

    onSave = (e) => {
        e.preventDefault()
        let { id, txtName, txtPrice, chkbStatus } = this.state
        let { history } = this.props
        let product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        }
        if (id) {
            callApi(`products/${id}`, 'PUT', {
                name: txtName,
                price: txtPrice,
                status: chkbStatus
            }).then(res => {
                history.goBack()
            })
        } else {
            this.props.onAddProduct(product)
            history.goBack()
        }
    }

    render() {
        let { txtName, txtPrice, chkbStatus } = this.state
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                <form onSubmit={this.onSave} >
                    <div className="form-group">
                        <label>Tên Sản Phẩm</label>
                        <input type="text" className="form-control" name="txtName"
                            value={txtName}
                            onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Giá</label>
                        <input type="number" className="form-control" name="txtPrice"
                            value={txtPrice}
                            onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái</label>
                    </div>

                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name="chkbStatus"
                                value={chkbStatus} onChange={this.onChange}
                                checked={chkbStatus} />
                            Còn hàng
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary mr-10">Lưu lại</button>
                    <Link to="/product-list" className="btn btn-danger">
                        Trở lại
                    </Link>
                </form>

            </div>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        product: state.products
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        onAddProduct: (product) => {
            dispatch(actAddProductRequest(product))
        },
        onGetEdittingProduct: (id) => {
            dispatch(actGetProductEdittingRequest(id))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(ProductActionPage);

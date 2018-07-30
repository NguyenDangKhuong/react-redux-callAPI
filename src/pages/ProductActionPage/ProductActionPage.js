import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { actAddProductRequest, actGetProductEdittingRequest, actUpdateProductRequest } from './../../actions/index'
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
        let { match, itemEditting } = this.props
        if (match) {
            let id = match.params.id;
            this.props.onGetEdittingProduct(id)
            console.log(itemEditting)
        }
    }

    //fill data to edit form but no get data so i fail
    // componentWillReceiveProps(nextProps){
    //     if(nextProps && nextProps.itemEditting){
    //         let {itemEditting} = nextProps
    //         this.setState({
    //             id = itemEditting.id,
    //             txtName = itemEditting.name,
    //             txtPrice = itemEditting.price,
    //             chkbStatus = itemEditting.status
    //         })
    //     }
    // }

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
            this.props.onUpdateProduct(product)
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
        itemEditting: state.itemEditting
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        onAddProduct: (product) => {
            dispatch(actAddProductRequest(product))
        },
        onGetEdittingProduct: (id) => {
            dispatch(actGetProductEdittingRequest(id))
        },
        onUpdateProduct: (product) => {
            dispatch(actUpdateProductRequest(product))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(ProductActionPage);

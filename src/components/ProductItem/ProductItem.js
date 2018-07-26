import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class ProductList extends Component {

    onDelete = (id) => {
        if (confirm('Bạn có chắn chắn muốn xoá sản phẩm hay không?')) { //eslint-disable-line
            this.props.onDelete(id)
        }
    }

    render() {
        let { product, index } = this.props
        let statusName = product.status ? 'Còn hàng' : 'Hết hàng'
        let statusClass = product.status ? 'warning' : 'default'
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                    <span className={`label label-${statusClass}`}>{statusName}</span>
                </td>
                <td>
                    <Link to={`/product/${product.id}/edit`} className="btn btn-success mr-10"
                    >
                        Sửa
                    </Link>

                    <button type="button" className="btn btn-danger"
                        onClick={() => this.onDelete(product.id)}
                    >
                        Xoá
                    </button>

                </td>
            </tr>
        );
    }
}

export default ProductList;

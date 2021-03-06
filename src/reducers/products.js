import * as Types from './../constants/ActionsType'

let initialState = []

const products = (state = initialState, action) => {
    let index = -1
    let {product} = action
    switch (action.type) {
        case Types.FETCH_PRODUCTS:
            state = action.products
            return [...state]
        case Types.DELETE_PRODUCT:
            index = findIndex(state, action.id)
            state.splice(index,1)
            return [...state]
        case Types.ADD_PRODUCT:
            state.push(action.product)
            return [...state]
        case Types.EDIT_PRODUCT:
            index = findIndex(state, product.id)
            state[index] = product
            return [...state]
        default: return [...state]
    }
}

const findIndex = (products, id) => {
    let result = -1
    products.forEach((product, index) => {
        if (product.id === id) {
            result = index
        }
    })
    return result
}

export default products
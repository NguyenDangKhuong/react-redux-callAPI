import * as Types from './../constants/ActionsType'

let initialState = []

const products = (state = initialState, action) => {
    let index = -1
    let {id} = action
    switch (action.type) {
        case Types.FETCH_PRODUCTS:
            state = action.products
            return [...state]
        case Types.DELETE_PRODUCT:
            index = findIndex(state, id)
            state.splice(index,1)
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
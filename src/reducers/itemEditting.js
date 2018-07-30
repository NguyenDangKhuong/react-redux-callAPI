import * as Types from './../constants/ActionsType'

let initialState = {}

const itemEditting = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_EDIT_PRODUCT:
            // console.log(action.product)  
            return  action.product
        default:
            return state
    }
}

export default itemEditting
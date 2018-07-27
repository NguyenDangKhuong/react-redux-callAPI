import * as Types from './../constants/ActionsType'

let initialState = {}

const itemEditting = (state = initialState, action) => {
    switch (action.Types) {
        case Types.GET_EDIT_PRODUCT:
            return  action.product
        default:
            return state
    }
}

export default itemEditting
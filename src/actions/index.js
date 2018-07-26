import * as types from './../constants/ActionsType'

export const actFetchProducts = (products) => {
    return {
        type: types.FETCH_PRODUCTS,
        products

    }
}
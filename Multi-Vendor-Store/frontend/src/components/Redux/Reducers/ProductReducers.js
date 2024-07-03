const Product = []

export const getProductsReducers = (state={Product},action) =>{
    switch(action.type)
    {
        case "SUCCESS_GET_PRODUCTS" :
            return {Product : action.payload}
        case "FAIL_GET_PRODUCTS" :
            return {Product : action.payload}
            default : return state
    }
}
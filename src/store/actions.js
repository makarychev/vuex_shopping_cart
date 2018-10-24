import shop from '@/api/shop'

export default { // = methods
    fetchProducts ({commit}){
        return new Promise((resolve, reject) => {
            // make the call
            // run setProducts mutation
            shop.getProducts(products => {
                commit('setProducts', products)
                resolve()
            })
        })
        
    },
    // {state, getters, commit}
    addProductToCart ({state, getters, commit}, product) {
        if (getters.productInStock(product)) {
            const cartItem = state.cart.find(item => item.id === product.id)
            if (!cartItem) {
                commit('pushProductToCart', product.id)
            } else {
                commit('incrementItemQuantity', cartItem)
            }
            commit('decrementProductInventory', product)
        }
    },

    checkout ({state, commit}) {
        shop.buyProducts(
            state.cart,
            () => {
                commit('emptyCart')
                commit('setCheckoutStatus', 'success')
            },
            () => {
                commit('setCheckoutStatus', 'fail')
            }
        )
    }
}
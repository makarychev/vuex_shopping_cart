import shop from "@/api/shop";

export default {
    state: {
        items: []
    },

    getters: {
        avaliableProducts (state, getters) {
            return state.items.filter(product => product.inventory > 0)
        },

        productInStock () {
            return (product) => {
                return product.inventory > 0
            }
        }
    },

    mutations: {
        setProducts (state, products) {
            // update products
            state.items = products
        },

        decrementProductInventory (state, product) {
            product.inventory--
        }
    },

    actions: {
        fetchProducts ({commit}){
            return new Promise((resolve, reject) => {
                // make the call
                // run setProducts mutation
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve()
                })
            })
        }
    }
}
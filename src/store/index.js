import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'
import { resolve } from 'upath';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        product: []
    },

    getters: { // = computed properties
        avaliableProducts (state, getters) {
            return state.product.filter(product => product.inventory > 0)
        }
    },

    actions: { // = methods
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

        // addToCard (context, product) {
        //     if (product.inventory > 0) {
        //         context.commit('pushProductToCard', product)
        //     } else {
        //         // show out of stock message
        //     }
        // }
    },

    mutations: {
        setProducts (state, products) {
            // update products
            state.products = products
        }
    }
})
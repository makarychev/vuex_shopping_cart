import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        product: []
    },

    getters: {
        productsCount () {
            /// ...
        }
    },

    actions: {
        fetchProducts (){
            // make the call
            // run setProducts mutation
        }
    },

    mutations: {
        setProducts (state, products) {
            // update products
            state.products = products
        }
    }
})
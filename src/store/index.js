import Vuex from 'vuex'
import Vue from 'vue'

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
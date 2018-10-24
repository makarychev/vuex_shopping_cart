import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'
import { resolve } from 'upath';
import { fail } from 'assert';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        product: [],
        // {id, quantity}
        cart: [],
        checkoutStatus: null
    },

    getters: { // = computed properties
        avaliableProducts (state, getters) {
            return state.product.filter(product => product.inventory > 0)
        },

        cartProducts (state) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },

        cartTotal (state, getters) {
            // let total = 0
            // getters.cartProducts.forEach(product => {
            //     total += product.price * product.quantity
            // })
            // return total
            return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
        },

        productInStock () {
            return (product) => {
                return product.inventory > 0
            }
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
    },

    mutations: {
        setProducts (state, products) {
            // update products
            state.products = products
        },

        // const cartItem = {id: 123, quantity: 2}
        pushProductToCart (state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },

        incrementItemQuantity (state, cartItem) {
            cartItem.quantity++
        },

        decrementProductInventory (state, product) {
            product.inventory--
        },

        setCheckoutStatus (state, status) {
            state.checkoutStatus = status
        },

        emptyCart (state) {
            state.cart = []
        }
    }
})
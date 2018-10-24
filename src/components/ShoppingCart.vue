<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{product.title}} - {{product.price | currency}} - {{product.quantity}}
            </li>
        </ul>
        <p>Total: {{total | currency}}</p>
        <button @click="$store.dispatch('checkout')">Checkout</button>
        <p v-if="checkoutStatus">{{checkoutStatus}}</p>
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex'
    export default {
        computed: {
            ...mapState({
                checkoutStatus: 'checkoutStatus'
            }),

            ...mapGetters({
                products: 'cartProducts',
                total: 'cartTotal'
            })
        },
    }
</script>

<style scoped>

</style>



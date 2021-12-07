import Vue from 'vue'
import Vuex from 'vuex'
import { orderService } from '../services/order.service'

Vue.use(Vuex)

export const orderStore = {
    strict: true,
    state: {
        currOrder: null,
        orders: [],


    },
    getters: {

    },
    mutations: {
        removeOrder(state, payload) {
            state.orders = state.orders.filter((order) => order._id !== payload.orderId)
        },
        addOrder(state, payload) {
            state.orders.push(payload.order)
            console.log(state.orders);
        },
        updateOrder(state, payload) {
            const idx = state.orders.findIndex((order) => order._id === payload.order._id)
            state.orders.splice(idx, 1, payload.order)
        },
        setOrders(state, { orders }) {
            state.orders = orders
        },
        getOrder(state, { order }) {
            state.currOrder = order
        },
    },
    actions: {
        loadOrders({ commit }) {
            orderService
                .query()
                .then((orders) => {
                    commit({ type: 'setOrders', orders })
                })

        },
        addOrder({ commit }, { order }) {
            return orderService.save(order).then((savedOrder) => {
                commit({ type: 'addOrder', order: savedOrder })
                return savedOrder
            })
        },
        updateOrder({ commit }, { order }) {
            return orderService.save(order).then((savedOrder) => {
                commit({ type: 'updateOrder', order: savedOrder })
                return savedOrder
            })
        },
        removeOrder({ commit }, { orderId }) {
            return orderService.remove(orderId).then(() => {
                commit({ type: 'removeOrder', orderId })
            })
        },
        getOrder({ commit }, { orderId }) {
            if (!orderId) {
                return orderService.getEmptyOrder()
            }
            return orderService.getById(orderId).then((order) => {
                commit({ type: 'getOrder', order })
                return order
            })
        },

        async saveOrder({ commit }, { newOrder }) {
            return await orderService.saveCurrOrder(newOrder)

        }

    },
}
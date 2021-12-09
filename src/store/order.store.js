import Vue from 'vue'
import Vuex from 'vuex'
import { orderService } from '../services/order.service'

Vue.use(Vuex)

export const orderStore = {
    strict: true,
    state: {
        currOrder: null,
        orders: [],
        emptyOrder: orderService.getEmptyOrder(),
        notifications: []
    },
    getters: {
        getEmptyOrder(state) {
            return state.emptyOrder;
        }
    },
    mutations: {
        addOrder(state, payload) {
            state.orders.push(payload.order)
            console.log(state.orders);
        },
        updateOrder(state, payload) {
            const idx = state.orders.findIndex((order) => order._id === payload.order._id)
            state.orders.splice(idx, 1, payload.order)
        },
        removeOrder(state, payload) {
            state.orders = state.orders.filter((order) => order._id !== payload.orderId)
        },
        setOrders(state, { orders }) {
            state.orders = orders
        },
        currOrder(state, { order }) {
            state.currOrder = order
        },
    },
    actions: {
        loadOrders({ commit }) {
            const orders = orderService.query();
            commit({ type: 'setOrders', orders })
        }

    },
    async addOrder({ commit }, { order }) {
        try {
            console.log('store: order', order);
            const savedOrder = await orderService.save(order);
            commit({ type: 'addOrder', order: savedOrder })
            return savedOrder;
        } catch (err) {
            console.log('stayStore: Error in add order', err);
            throw err;
        }
    },
    async updateOrder({ commit }, { order }) {
        try {
            console.log('store: order', order);
            const savedOrder = await orderService.save(order);
            commit({ type: 'updateOrder', order: savedOrder })
            return savedOrder;
        } catch (err) {
            console.log('stayStore: Error in update order', err);
            throw err;
        }
    },
    async removeOrder({ commit }, { orderId }) {
        try {
            await orderService.remove(orderId)
            commit({ type: 'removeOrder', orderId })
        } catch (err) {
            console.log('stayStore: Error in remove order', err);
            throw err;
        }
    },
    async getOrder({ commit }, { orderId }) {
        try {
            const order = await orderService.getById(orderId);
            commit({ type: 'getOrder', order });
            return order;
        } catch (err) {
            console.log('stayStore: Error in getting order', err);
            throw err;
        }
    },

}
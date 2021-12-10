import { orderService } from '../services/order.service.js';

export const orderStore = {
  strict: true,
  state: {
    currOrder: null,
    orders: [],
    emptyOrder: orderService.getEmptyOrder(),
    notifications: 0,
  },
  getters: {
    getEmptyOrder(state) {
      return state.emptyOrder;
    },
    getNotifications(state) {
      return state.notifications;
    },
  },
  mutations: {
    addOrder(state, { order }) {
      console.log('store state', state.orders);
      state.orders.push(order);
    },
    updateOrder(state, { order }) {
      const idx = state.orders.findIndex((order) => order._id === order._id);
      state.orders.splice(idx, 1, order);
    },
    removeOrder(state, payload) {
      state.orders = state.orders.filter(
        (order) => order._id !== payload.orderId
      );
    },
    setOrders(state, { orders }) {
      console.log(orders);
      state.orders = orders;
    },
    currOrder(state, { order }) {
      state.currOrder = order;
    },
  },
  actions: {
    async loadOrders({ commit }) {
      try {
        const orders = await orderService.query();
        commit({ type: 'setOrders', orders });
      } catch (err) {
        console.log('orderStore: Error in load orders', err);
        throw err;
      }
    },
    async addOrder({ commit }, { order }) {
      console.log('context', commit);
      try {
        console.log('store: order', order);
        const savedOrder = await orderService.save(order);
        commit({ type: 'addOrder', order: savedOrder });
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
        commit({ type: 'updateOrder', order: savedOrder });
        return savedOrder;
      } catch (err) {
        console.log('stayStore: Error in update order', err);
        throw err;
      }
    },
    async removeOrder({ commit }, { orderId }) {
      try {
        await orderService.remove(orderId);
        commit({ type: 'removeOrder', orderId });
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
  },
};

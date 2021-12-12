// import { storageService } from './async-storage.service'
import { utilService } from './util.service';
// const axios = require('axios')
import { httpService } from './http.service';

export const orderService = {
  query,
  getById,
  remove,
  save,
  getEmptyOrder,
};

async function query({ userId, userType }) {
  // return httpService.get(`order`)
  // return await httpService.get('order', { params: { user.userId, user.userType } })
  console.log('frontend service: userId, userType', userId, userType);
  return await httpService.get('order', { params: { userId, userType } });
}

async function getById(orderId) {
  console.log('front service get order', orderId);
  return httpService.get(`order/${orderId}`);
}

async function remove(orderId) {
  console.log('front service order to delete', orderId);
  return httpService.delete(`order/${orderId}`);
}

async function save(order) {
  if (order._id) {
    const savedOrder = await httpService.put(`order/${order._id}`, order);
    return savedOrder;
  } else {
    console.log('front service order', order);
    const savedOrder = await httpService.post(`order`, order);
    return savedOrder;
  }
}

function getEmptyOrder() {
  return {
    hostId: '',
    createdAt: Date.now(),
    buyer: {
      _id: '',
      fullname: '',
      imgUrl: '',
    },
    totalPrice: 0,
    dates: {},
    totalNights: 0,
    totalGuests: {},
    stay: {
      _id: '',
      name: '',
      price: 0,
    },
    status: 'pending',
  };
}

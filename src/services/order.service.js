// import { storageService } from './async-storage.service'
import { utilService } from './util.service'
// const axios = require('axios')
import { httpService } from './http.service'

export const orderService = {
    query,
    getById,
    remove,
    save,
    getEmptyOrder,
}

async function query() {
    return httpService.get(`order`)

}

async function getById(orderId) {
    return httpService.get(`order/${orderId}`)
}

async function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}

async function save(order) {
    if (order._id) {
        const savedOrder = await httpService.put(`order/${order._id}`, order)
        return savedOrder

    } else {
        const savedOrder = await httpService.post(`order`, order)
        return savedOrder
    }
}

function getEmptyOrder() {
    return {
        _id: '',
        hostId: '',
        createdAt: Date.now(),
        buyer: {
            _id: '',
            fullname: ''
        },
        totalPrice: 0,
        dates: '',
        startDate: '',
        endDate: '',
        totalDays: 0,
        guests: {},
        stay: {
            _id: '',
            name: '',
            price: 0
        },
        status: 'pending'
    }
}
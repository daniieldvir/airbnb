

async function emitToUser({ type, data, userId }) {
    logger.debug('Emiting to user socket: ' + userId)
    const socket = await _getUserSocket(userId)
    if (socket) socket.emit(type, data)
    else {
        console.log('User socket not found');
        _printSockets();
    }
}


//socket-service frontend
import io from 'socket.io-client'
export const SOCKET_EVENT_ORDER_ADDED = 'order-added'
const baseUrl = process.env.NODE_ENV === "production" ? "" : "//localhost:3030";
export const socketService = createSocketService()

//store.js
async loadOrders({ commit }, { user }) {
    try {
        console.log('store loadorders user', user)
        const orders = await orderService.query(user);
        console.log('orders store after load', orders)
        commit({ type: 'setOrders', orders });
        socketService.off(SOCKET_EVENT_ORDER_ADDED)
        socketService.on(SOCKET_EVENT_ORDER_ADDED, order => {
            console.log('Got order from socket', order);
            commit({ type: 'addOrder', order })
        })
    } catch (err) {
        console.log('orderStore: Error in load orders', err);
        throw err;
    }
},

//order-service backend
async function add(order) {
    try {
        const buyer = {
            _id: ObjectId(order.buyer.id),
            fullname: order.buyer.fullname,
            imgUrl: order.buyer.imgUrl,
        };
        order.buyer = buyer;
        order.hostId = ObjectId(order.hostId);
        const stay = {
            _id: ObjectId(order.stay._id),
            name: order.stay.name,
            price: order.stay.price,
        };
        order.stay = stay;
        const collection = await dbService.getCollection('order');
        const addedOrder = await collection.insertOne(order);
        socketService.emitToUser({ type: 'order-added', data: order, userId: order.hostId, });
        return addedOrder;
    } catch (err) {
        logger.error('cannot insert order', err);
        throw err;
    }

    //user-service frontend 
    async function login(userCred) {
        const user = await httpService.post('auth/login', userCred);
        socketService.emit('set-user-socket', user._id);
        if (user) return _saveLocalUser(user);
    }

    //socket-service backend
    socket.on('set-user-socket', userId => {
        logger.debug(`Setting (${socket.id}) socket.userId = ${userId}`)
        socket.userId = userId
    })
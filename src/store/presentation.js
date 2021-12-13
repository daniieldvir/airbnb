

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
export const SOCKET_EVENT_ORDER_ADDED = 'order-added'

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

//store.js
async loadOrders({ commit }, { user }) {
    try {
        const orders = await orderService.query(user);
        commit({ type: 'setOrders', orders });
        socketService.off(SOCKET_EVENT_ORDER_ADDED)
        socketService.on(SOCKET_EVENT_ORDER_ADDED, order => {
            commit({ type: 'addOrder', order })
        })
    } catch (err) {
        console.log('orderStore: Error in load orders', err);
        throw err;
    }
},

//order-service backend
async function addOrder(req, res) {
    try {
      var order = req.body;
      const addedOrder = await orderService.add(order);
      socketService.emitToUser({ type: 'order-added', data: order, userId: order.hostId })
      res.json(addedOrder);
    } catch (err) {
      logger.error('Failed to add order', err);
      res.status(500).send({ err: 'Failed to add order' });
    }
  }


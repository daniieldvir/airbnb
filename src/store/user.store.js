// import { userService } from '../services/user.service.js'
import { userService } from '../services/user.service-remote.js';

export const userStore = {
  state: {
    loggedInUser: userService.getLoggedInUser(),
    watchedUser: null,
    ownedStays: null,
  },
  getters: {
    user(state) {
      return state.loggedInUser;
    },
    miniUser(state) {
      const _id = state.user._id;
      const fullname = state.user.fullname;
      const imgUrl = state.user.imgUrl;
      return {
        _id,
        fullname,
        imgUrl,
      };
    },
    loggedInUser(state) {
      return state.loggedInUser;
    },
    reviewsByUser(state) {
      return state.reviewsByUser;
    },
    watchedUser({ watchedUser }) {
      return watchedUser;
    },
  },
  mutations: {
    setLoggedInUser(state, { user }) {
      // Yaron: needed this workaround as for score not reactive from birth
      state.loggedInUser = user ? { ...user } : null;
    },
    setWatchedUser(state, { user }) {
      state.watchedUser = user;
    },
    setUsers(state, { users }) {
      state.users = users;
    },
    removeUser(state, { userId }) {
      state.users = state.users.filter((user) => user._id !== userId);
    },
  },
  actions: {
    async login({ commit }, { userCred }) {
      try {
        const user = await userService.login(userCred);
        commit({ type: 'setLoggedInUser', user });
        return user;
      } catch (err) {
        console.log('userStore: Error in login', err);
        throw err;
      }
    },
    async signup({ commit }, { userCred }) {
      try {
        const user = await userService.signup(userCred);
        commit({ type: 'setLoggedInUser', user });
        return user;
      } catch (err) {
        console.log('userStore: Error in signup', err);
        throw err;
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout();
        commit({ type: 'setLoggedInUser', user: null });
      } catch (err) {
        console.log('userStore: Error in logout', err);
        throw err;
      }
    },

    //////////
    async loadUsers({ commit }) {
      // TODO: loading
      try {
        const users = await userService.getUsers();
        commit({ type: 'setUsers', users });
      } catch (err) {
        console.log('userStore: Error in loadUsers', err);
        throw err;
      }
    },
    async loadAndWatchUser({ commit }, { userId }) {
      try {
        const user = await userService.getById(userId);
        commit({ type: 'setWatchedUser', user });
        socketService.emit(SOCKET_EMIT_USER_WATCH, userId);
        socketService.off(SOCKET_EVENT_USER_UPDATED);
        socketService.on(SOCKET_EVENT_USER_UPDATED, (user) => {
          commit({ type: 'setWatchedUser', user });
        });
      } catch (err) {
        console.log('userStore: Error in loadAndWatchUser', err);
        throw err;
      }
    },
    async removeUser({ commit }, { userId }) {
      try {
        await userService.remove(userId);
        commit({ type: 'removeUser', userId });
      } catch (err) {
        console.log('userStore: Error in removeUser', err);
        throw err;
      }
    },
    async updateUser({ commit }, { user }) {
      try {
        user = await userService.update(user);
        commit({ type: 'setUser', user });
      } catch (err) {
        console.log('userStore: Error in updateUser', err);
        throw err;
      }
    },
    async loadOwnedStays({ commit }, { hostId }) {
      try {
        // const user = await userService.login(userCred);
        dispatch({ type: 'setFilter', filterBy: hostId });
      } catch (err) {
        console.log('userStore: Error in loadOwnedStays', err);
        throw err;
      }
    },
  },
};

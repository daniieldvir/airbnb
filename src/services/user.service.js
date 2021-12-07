// // import { storageService } from './async-storage.service'
// // import { httpService } from './http.service'
// // import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
// // const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// // var gWatchedUser = null;

import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';

const USERS_KEY = 'users';
let gUsers;
_createUsers();

// console.log("gUsers", gUsers);

// export const userService = {
//   login,
//   logout,
//   signup,
//   getLoggedInUser,
//   getUsers,
//   getById,
//   remove,
//   update,
//   changeScore,
// };

// // Debug technique
// window.userService = userService;

// function getUsers() {
//   return storageService.query('user');
//   // return httpService.get(`user`)
// }

// async function getById(userId) {
//   const user = await storageService.get('user', userId);
//   // const user = await httpService.get(`user/${userId}`)
//   gWatchedUser = user;
//   return user;
// }
// function remove(userId) {
//   return storageService.remove('user', userId);
//   // return httpService.delete(`user/${userId}`)
// }

// async function update(user) {
//   await storageService.put('user', user);
//   // user = await httpService.put(`user/${user._id}`, user)
//   // Handle case in which admin updates other user's details
//   if (getLoggedInUser()._id === user._id) _saveLocalUser(user);
//   return user;
// }

// async function login(userCred) {
//   const users = await storageService.query('user');
//   const user = users.find((user) => user.username === userCred.username);
//   return _saveLocalUser(user);

//   // const user = await httpService.post('auth/login', userCred)
//   // socketService.emit('set-user-socket', user._id);
//   // if (user) return _saveLocalUser(user)
// }
async function signup(userCred) {
  userCred.score = 10000;
  const user = await storageService.post('user', userCred);
  // const user = await httpService.post('auth/signup', userCred)
  // socketService.emit('set-user-socket', user._id);
  return _saveLocalUser(user);
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  // socketService.emit('unset-user-socket');
  // return await httpService.post('auth/logout')
}

// async function changeScore(by) {
//   const user = getLoggedInUser();
//   if (!user) throw new Error('Not loggedin');
//   user.score = user.score + by || by;
//   await update(user);
//   return user.score;
// }

function _saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedInUser() {
  return JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null'
  );
}

// // (async ()=>{
// //     await userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
// //     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
// //     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// // })();

// // This IIFE functions for Dev purposes
// // It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//   var user = getLoggedInUser();
//   // Dev Helper: Listens to when localStorage changes in OTHER browser

//   // Here we are listening to changes for the watched user (comming from other browsers)
//   window.addEventListener('storage', async () => {
//     if (!gWatchedUser) return;
//     const freshUsers = await storageService.query('user');
//     const watchedUser = freshUsers.find((u) => u._id === gWatchedUser._id);
//     if (!watchedUser) return;
//     if (gWatchedUser.score !== watchedUser.score) {
//       console.log(
//         'Watched user score changed - localStorage updated from another browser'
//       );
//       socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser);
//     }
//     gWatchedUser = watchedUser;
//   });
// })();

// // This is relevant when backend is connected
// // (async () => {
// //     var user = getLoggedinUser()
// //     if (user) socketService.emit('set-user-socket', user._id)
// // })();

function _createUsers() {
  const users = [
    {
      _id: 'lo107',
      fullname: 'Chrissie Morales',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638638346/london/apt7/GC-GettyImages-623463222-613x920_ucthfw.jpg',
      isAdmin: false,
      isHost: true,
      username: 'Chrissie',
      password: '1234',
    },
    {
      _id: '23423423rg35gvs',
      fullname: 'Team At The London Agent',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638632306/london/apt3/user_zzrpya.jpg',
      isAdmin: false,
      isHost: true,
      username: 'London Agent',
      password: '',
    },
    {
      _id: 'lo104',
      fullname: 'Beatrix Lor',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638633185/london/apt4/rev_cb3daw.jpg',
      isAdmin: false,
      isHost: true,
      username: 'Betty',
      password: '346346',
    },
    {
      _id: 'lo105',
      fullname: 'Supercity Aparthotels',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638634569/london/apt5/sddf_jfuxei.jpg',
      isAdmin: false,
      isHost: true,
      username: 'Supercity Aparthotels',
      password: '1234',
    },
    {
      _id: 'lo106',
      fullname: 'Marcus Adams',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638635579/london/apt6/portrait-confident-man-looking-camera-260nw-1591189321_tzqlm3.jpg',
      isAdmin: false,
      isHost: true,
      username: 'Mark',
      password: '1234',
    },
    {
      _id: 'kj900',
      fullname: 'Marlon Bordo',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638300062/our_kind_of_people_lance_gross_2x_ssvg9h.jpg',
      isAdmin: false,
      isHost: true,
      username: 'marlo',
      password: '123',
    },
    {
      _id: 'f8989',
      fullname: 'Bonnie Bonno',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299789/host_qszv7p.jpg',
      isAdmin: false,
      isHost: true,
      username: 'bonnie',
      password: '123',
    },
    {
      _id: 't36367',
      fullname: 'Tee Tyrel',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638300901/pexels-photo-1300402_wtxf88.jpg',
      isAdmin: false,
      isHost: true,
      username: 'tee',
      password: '123',
    },
    {
      _id: 'u120',
      fullname: 'Will Smit',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299465/tel-aviv/apr1/wouter-aghina_fc-mask_profile_1536x1152_wmamov.webp',
      isAdmin: false,
      isHost: true,
      username: 'WillS',
      password: '',
    },
    {
      _id: 'u121',
      fullname: 'Limor Ronen',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299259/tel-aviv/apr2/host_csyws6.jpg',
      isAdmin: false,
      isHost: true,
      username: 'LimRon',
      password: '',
    },
    {
      _id: 'u122',
      fullname: 'Tom Dvir',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638300900/depositphotos_11412590-stock-photo-handsome-young-man_f1iwbg.jpg',
      isAdmin: false,
      isHost: true,
      username: 'tom123',
      password: '',
    },
    {
      _id: 'u123',
      fullname: 'Tamar Choen',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638300901/istockphoto-969233490-612x612_pls00z.jpg',
      isAdmin: false,
      isHost: true,
      username: 'tamar909',
      password: '',
    },
    {
      _id: 3463463462244,
      fullname: 'Emma Wilson',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299902/photo-1438761681033-6461ffad8d80_bhahe9.jpg',
      isAdmin: false,
      isHost: true,
      username: 'EmmaW89',
      password: '',
    },
    {
      _id: 807807856456,
      fullname: 'Christopher Louise',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299987/images_gj0cfe.jpg',
      isAdmin: false,
      isHost: true,
      username: 'Chris6',
      password: '',
    },
    {
      _id: 'bor101',
      fullname: 'Hitiura & Lionel',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638648400/bora%20bora/apt3/sdv_ffmara.jpg',
      isAdmin: false,
      isHost: true,
      username: 'Hl',
      password: '1234',
    },
    {
      _id: 'us110',
      fullname: 'Joe Black',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638649316/bora%20bora/apt4/dfg_occksy.jpg',
      isAdmin: false,
      isHost: true,
      username: 'JOE',
      password: '1234',
    },
    {
      _id: 'us789',
      fullname: 'Jeff Thomas',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638650143/bora%20bora/apt5/images_1_uohumv.jpg',
      isAdmin: false,
      isHost: true,
      username: 'Jeff',
      password: '1234',
    },
    {
      _id: 'fr666',
      fullname: 'Jean-Marie',
      imgUrl:
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638651497/exotic/apt1/pexels-photo-3310695_ixtxwp.jpg',
      isAdmin: false,
      isHost: true,
      username: 'Mar',
      password: '1234',
    },
  ];
  gUsers = users;
  utilService.saveToStorage(USERS_KEY, gUsers);
}

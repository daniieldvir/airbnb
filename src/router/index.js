import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home-page';
import stayDetails from '../views/stay-details.vue';
import Explore from '../views/stay-app';
import BecomeHost from '../views/stay-edit';
import userProfile from '../views/user-profile-page';
// import userProfile from '../views/user-profile-page-anna';
import stayEdit from '../views/stay-edit';
import trips from '../views/trips-page';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore,
  },
  {
    path: '/become-host',
    name: 'BecomeHost',
    component: BecomeHost,
  },
  {
    path: '/user-profile',
    name: 'userProfile',
    component: userProfile,
  },
  {
    path: '/trips',
    name: 'trips',
    component: trips,
  },
  {
    path: '/stay/:stayId?/edit',
    component: stayEdit,
    component: stayEdit,
  },

  // {
  //   path: '/stay-app',
  //   name: 'stayApp',
  //   component: stayApp,
  // },
  // {
  //   path: '/stay-app/edit/',
  //   name: 'stayEdit',
  //   component: stayEdit,
  // },
  {
    path: '/stay/:stayId',
    name: 'stayDetails',
    component: stayDetails,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

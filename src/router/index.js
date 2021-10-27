import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: ()=> import('../views/SignIn.vue'),
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access-token') == null) next();
      else router.push('/profile');
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: ()=> import('../views/Register.vue'),
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access-token') == null) next();
      else router.push('/profile');
    }
  },
  {
    path: '/logout',
    beforeEnter: (to, from, next) => {
      store.dispatch('signout')
      .then(()=> router.push('/signin'))
      .catch(()=> router.back());
    }
  },
  {
    path: '/tutors/explore',
    name: 'ExploreTutors',
    component: ()=> import('../views/ExploreTutors.vue'),
  },
  {
    path: '/tutor/:name',
    name: 'Tutor',
    component: ()=> import('../views/Tutor.vue'),
  },
  {
    path: '/become-tutor',
    name: 'BecomeTutor',
    component: ()=> import('../views/BecomeTutor.vue'),
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: ()=> import('../views/UserProfile.vue'),
    beforeEach: (to, from, next)=> {
      if(localStorage.getItem('access-token') != null) next();
      else router.push('/signin');
    },
    children: [
      {
        path: 'schedule', alias: '', name: 'UserSchedule',
        component:  ()=> import('../components/schedule/schedule.vue'),
      },
      {
        path: 'lessons', name: 'UserLessons',
        component:  ()=> import('../components/userprofile/lessons.vue'),
      },
      {
        path: 'tutors', name: 'UserTutors',
        component:  ()=> import('../components/userprofile/tutors.vue'),
      },
      {
        path: 'edit', name: 'EditProfile',
        component:  ()=> import('../components/userprofile/edit-profile.vue'),
      },
    ]
  },
  {
    path: '/community',
    name: 'Community',
    component: ()=> import('../views/BecomeTutor.vue'),
  },
  {
    path: '/booking-payment',
    component: ()=> import('../views/BookingPayment.vue'),
    name: 'BookingPayment',
    props: true
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

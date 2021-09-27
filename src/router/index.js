import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ExploreTutors from '../views/ExploreTutors.vue'
import Tutor from '../views/Tutor.vue'
import Register from '../views/Register.vue'
import SignIn from '../views/SignIn.vue'
import UserProfile from '../views/UserProfile.vue'
import EditProfile from '../components/EditProfile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access-token') == null) next();
      else router.push('/profile');
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access-token') == null) next();
      else router.push('/profile');
    }
  },
  {
    path: '/tutors/explore',
    name: 'ExploreTutors',
    component: ExploreTutors
  },
  {
    path: '/tutors/tutorname',
    name: 'Tutor',
    component: Tutor
  },
  {
    path: '/profile',
    component: UserProfile,
    children: [
      {
        path: 'edit',
        component:  EditProfile
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

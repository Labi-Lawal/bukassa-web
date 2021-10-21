import { createRouter, createWebHistory } from 'vue-router'
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
      if(localStorage.getItem('access-token') != null)
        localStorage.removeItem("access-token");

      router.push('/signin');
    }
  },
  {
    path: '/tutors/explore',
    name: 'ExploreTutors',
    component: ()=> import('../views/ExploreTutors.vue'),
    children: [
      {
        path: 'intro-video',
        name: 'IntroVideo',
        component: ()=> import('../components/tutor/intro-video'),
      },
      {
        path: 'schedule',
        name: 'Schedule',
        component: ()=> import('../components/schedule/schedule-min.vue')
      }
    ]
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
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

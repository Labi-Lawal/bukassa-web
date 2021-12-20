import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=> import('../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=> import('../views/SignIn.vue'),
    meta: {
      authRoute: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: ()=> import('../views/Register.vue'),
    meta: {
      authRoute: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: (to, from, next) => {
      store.dispatch('signout')
      .then(()=> router.push('/login'))
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
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: ()=> import('../views/UserProfile.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'schedule', alias: '', name: 'UserSchedule',
        component:  ()=> import('../components/schedule/schedule.vue'),
      },
      {
        path: 'lessons', name: 'UserLessons',
        component:  ()=> import('../components/userprofile/Lessons/Index.vue'),
        children: [
          {
            path: '', name: 'All Lessons',
            component:  ()=> import('../components/userprofile/Lessons/lessons.vue'),
          },
          {
            path: 'create', name: 'Create Lesson',
            component:  ()=> import('../components/userprofile/Lessons/create.vue'),
          }
        ]
      },
      {
        path: 'tutors', name: 'UserTutors',
        component:  ()=> import('../components/userprofile/tutors.vue'),
      },
      {
        path: 'students', name: 'UserStudents',
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
});

router.beforeEach ( async (to, from, next)=> {

  if(to.matched.some(record=> record.meta.requiresAuth)) {
    if(store.getters.token) {
      if(store.getters.userData != '') {
        if(store.getters.userData.role == 'tutor' && store.getters.tutorData == '') {
          await store.dispatch('fetchtutordata')
          .then((response)=> {
            next('/profile');
          })
          .catch(()=> next('/logout'))

        } else next();
      } else {
        // fetch user data
        await store.dispatch('fetchuserdata')
        .then(async ()=> {
          if(store.getters.userData.role == 'tutor' && store.getters.tutorData == '') {
            await store.dispatch('fetchtutordata')
            .then(()=> next())
            .catch(()=> next('/logout'))
          } 
        })
        .catch(()=> next('/logout'));
      }
    }
    else next('/login');
  }

  else next();
});

export default router

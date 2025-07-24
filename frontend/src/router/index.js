import DashboardComp from '@/components/DashboardComp.vue'
import AdminView from '@/views/AdminView.vue'
import LoginView from '@/views/LoginView.vue'
import OtpView from '@/views/OtpView.vue'
import SignUpView from '@/views/SignUpView.vue'
import StaffDashboardView from '@/views/StaffDashboardView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path :'/',
    component : LoginView,
    name:'login'
   },
   {
    path :'/signup',
    component:SignUpView,
    name:'signup'
   },
   {
    path:'/otp',
    component:OtpView,
    name:'otp'
   },
   {
    path:'/dashboard',
    component:DashboardComp,
    name:'dashboard',
    meta: {
      requiresAuth:true
    }
   },
   {
    path:'/staff',
    component:StaffDashboardView,
    name:'staffboard',
    meta: {
      requiresAuth:true
    }
   },
   {
    path:'/admin',
    component:AdminView,
    name:'adminpage'
   }
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  console.log(token)
  if (!token && to.meta.requiresAuth) {
    return next('/login')
  }

  if (token) {
    const decoded = jwtDecode(token)

    if (to.path === '/staff' && decoded.role !== 'staff') {
      return next('/dashboard')  // redirect non-staff
    }

    if (to.path === '/dashboard' && decoded.role !== 'customer') {
      return next('/staff') // redirect staff away from customer dashboard
    }

    if(to.path === '/admin' && decoded.role !== ' admin')
    {
      return next('dashboard')
    }
  }

  next()
})

export default router

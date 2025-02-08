import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import HomePage from '@/pages/HomePage.vue'
import { useAuthStore } from '@/stores/storeAuth.ts'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomePage,
        },
        {
          path: '/about',
          name: 'about',
          component: AboutView,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage, // No usa layout
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  // const { toggle } = useToast();
  const storeAuth = useAuthStore();

  // console.log('auth', to, storeAuth.isAuthenticated)

  if(!storeAuth.isAuthenticated) {
    await storeAuth.getUserByToken();
  }

  if(to.name == 'login' || to.name == 'register') {
    return next()
  }

  // // Si la ruta requiere autenticación y el usuario no está autenticado
  if (!storeAuth.isAuthenticated) {
    // toggle("Acceso no autorizado. Por favor, inicia sesión.", ToastType.ERROR);

    // Redirigir al login o página pública
    return next({ path: "/login" });  // Redirige al login o página pública
  }

  next(); // Permite la navegación a la siguiente ruta
});

export default router

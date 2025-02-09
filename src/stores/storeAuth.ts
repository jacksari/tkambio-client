import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/services/authService'
import { useRouter } from 'vue-router'
import { useCookie } from '@/composables/useCookie.ts'
import type {
  StoreAuth
} from '@/interfaces/auth.ts'

// const { toggle } = useToast();
// const { showConfirmSwal } = useSwal();
// const { isPreloading } = useLoading();

export const useAuthStore = defineStore('authentication', () => {

  const router = useRouter()

  const auth = ref<StoreAuth>({
    user: null,
    token: null,
    authenticated: false
  })

  const userLogin = ref({
    email: '',
    password: '',
    rememberMe: false
  })

  const login = async () => {

    const router = useRouter()

    // isPreloading();
    const resp = await authService.login(
      userLogin.value.email,
      userLogin.value.password
    )
    // isPreloading(false);

    if (resp?.status) {
      useCookie('accessToken').value = resp.data.access_token
      auth.value.token = resp.data.access_token
      auth.value.authenticated = true;
      auth.value.user = resp.data.user;
      // toggle(resp.message);

      clearFormLogin()

      // await getUserByToken()

      await redirectDashboard()

    }
  }

  const redirectDashboard = async () => {
    await router.push({
      path: '/'
    })
  }

  const getUserByToken = async () => {
    const token = useCookie('accessToken').value as string

    if (!token) return

    // isPreloading();
    const resp = await authService.profile()
    // isPreloading(false);

    if (resp?.status) {
      auth.value.user = resp.data
      auth.value.authenticated = true
      auth.value.token = useCookie('accessToken').value as string
    }
  }

  const logout = async () => {
    clearUser()
    await router.push('/login')
  }

  const clearUser = () => {
    auth.value = {
      user: null,
      token: null,
      authenticated: false
    }
    useCookie('accessToken').value = null
    console.log('auth', auth.value)
  }

  const clearFormLogin = () => {
    setTimeout(() => {
      userLogin.value = {
        email: '',
        password: '',
        rememberMe: false
      }
    }, 300)
  }

  const isAuthenticated = computed(() => auth.value.authenticated)

  return {
    auth,
    userLogin,
    isAuthenticated,
    clearUser,
    getUserByToken,
    login,
    logout
  }
})

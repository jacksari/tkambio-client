import { defu } from "defu";
import {useAuthStore} from "@/stores/storeAuth";
import { useCookie } from '@/composables/useCookie.ts'
import { useRouter } from 'vue-router'

export const useApi = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<{
  status: boolean;
  message: string;
  data: T | null;
}> => {
  const { logout, clearUser, auth } = useAuthStore()
  const accessToken = useCookie("accessToken");
  const router = useRouter()

  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken.value && { Authorization: `Bearer ${accessToken.value}` }),
    },
  };


  const requestOptions = defu(options, defaultOptions);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      const message = errorData.message || "Error desconocido";
      console.log('response.status', response.status)

      // Manejar errores comunes
      if ([400, 402, 404].includes(response.status)) {
        // toggle(message, ToastType.ERROR);
        return {
          status: false,
          message,
          data: null,
        };
      }

      if ([401].includes(response.status)) {
        // toggle(message, ToastType.ERROR);
        await logout();
        return {
          status: false,
          message: message,
          data: null,
        }

      }

      if ([403].includes(response.status)) {

        await logout();

        return {
          status: false,
          message: "No tienes permisos para acceder a esta ruta",
          data: null,
        };

      }

      if (response.status === 500) {
        // toggle("Error interno del servidor", ToastType.ERROR);
        return {
          status: false,
          message: "Error interno del servidor",
          data: null,
        };
      }

      // toggle(`Error de código ${response.status}`, ToastType.ERROR);
      return {
        status: false,
        message: `Error de código ${response.status}`,
        data: null,
      };
    }

    const responseData: T = await response.json();

    // Devuelve los datos correctamente
    return responseData;
  } catch (error) {
    console.error("Error en la solicitud:", error);

    // toggle("Error en la conexión con el servidor", ToastType.ERROR);
    return {
      status: false,
      message: "Error en la conexión con el servidor",
      data: null,
    };
  }
};

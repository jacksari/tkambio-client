<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/storeAuth.ts'

const storeAuth = useAuthStore()

const schema = yup.object({
  email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
})

const { values, errors, defineField, handleSubmit } = useForm({ validationSchema: schema })

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit((values) => {
  storeAuth.userLogin.email = values.email
  storeAuth.userLogin.password = values.password
  storeAuth.login()
})

</script>

<template>
  <div class="page-auth">
    <div class="container-form">
      <form class="form-auth" @submit.prevent="onSubmit">
        <div class="container-logo">
          <img src="/images/logo.png" alt="Logo">
        </div>
        <div class="container-form-message">
          <h3>Bienvenido/a 👋🏻
          </h3>
          <p>Inicia sesión en tu cuenta y comienza la aventura.</p>
        </div>
        <div class="container-form-inputs">
          <div class="input-group">
            <label for="email" class="input-label">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              class="input-field"
              placeholder="Ingrese su correo"
              v-bind="emailAttrs"
              v-model="email"
            />
            <span class="error-message">{{ errors.email }}</span>
          </div>

          <div class="input-group">
            <label for="password" class="input-label">Password</label>
            <input
              type="password"
              id="password"
              class="input-field"
              placeholder="Ingrese password"
              v-bind="passwordAttrs"
              v-model="password"
            />

            <span class="error-message">{{ errors.password }}</span>
          </div>


        </div>
        <div class="container-form-buttons">
          <button class="btn">Iniciar sesion</button>
        </div>

      </form>
    </div>
  </div>
</template>


<style scoped lang="scss">

.page-auth {
  background: var(--clr-grey-10);

  .container-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    .form-auth {
      width: 360px;
      background: var(--clr-white);
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      //padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 24px;

      .container-logo {
        //background: var(--clr-primary-5);
        //padding: 24px;
        display: flex;
        justify-content: center;

        img {
          height: 60px;
          width: 60px;
          object-fit: contain;
        }
      }

      .container-form-inputs {
        //padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .container-form-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        //padding: 0 24px 24px 24px;
        //background: red;
      }

      .container-form-message {
        //padding:
        p {
          font-size: 12px;
          margin-bottom: 0;
        }

        h3 {
          font-size: 24px;
        }
      }
      .error-message {
        color: red;
        font-size: 12px;
        //margin-top: 4px;
      }
    }
  }

}

</style>

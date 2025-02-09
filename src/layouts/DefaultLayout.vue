<script setup lang="ts">
import { useAuthStore } from '@/stores/storeAuth.ts'
const storeAuth = useAuthStore()

</script>


<template>
  <div>
    <header class="header">
      <nav class="">
        <div class="section-center">


          <div class="container-data-user">
            <div class="data-user">
              <p>{{ storeAuth.auth.user.name }}</p>
              <small>{{storeAuth.auth.user.email}}</small>
            </div>
            <button class="btn btn-error logout-mobile" @click="storeAuth.logout()">
              <v-icon name="hi-logout"></v-icon>
            </button>
          </div>
          <img src="/images/logo-completed.png" alt="Logo" />
          <button class="btn btn-error logout-desktop" @click="storeAuth.logout()">
            <v-icon name="hi-logout"></v-icon>
          </button>
        </div>
      </nav>
    </header>

    <main class="content">
      <router-view />
    </main>

    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} Tkambio</p>
    </footer>
  </div>
</template>

<style scoped>
.header {
  //background: #333;
  //color: white;
  //padding: 15px;
  //text-align: center;
}
nav {
  //background: var(--clr-primary-5);
  background: linear-gradient(180deg, #02ADF1 -2.37%, #4562E6 124.84%, #4563E6 124.84%);

  .section-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem .5rem;
    //display: flex;
    flex-direction: column;
    gap: 1rem;
    p {
    }

    img {
      height: 56px;
      width: 200px;
      object-fit: contain;
    }
    @media screen and (min-width: 500px){
      gap: 0rem;
      flex-direction: row;
      padding: 1rem 0;
    }
    .container-data-user{
      display: flex;
      justify-content: space-between;
      width: 100%;
      @media screen and (min-width: 500px){
        //gap: 1rem;
        width: auto;
      }
      .data-user{
        display: flex;
        flex-direction: column;
        gap: 0rem;
        p{
          margin-bottom: 0;
          color: var(--clr-primary-1);
        }
        small{
          margin-bottom: 0;
          color: var(--clr-primary-1);
        }
      }
      .logout-mobile{
        @media screen and (min-width: 500px){
          display: none;
        }
      }
    }
    .logout-desktop{
      display: none;
      @media screen and (min-width: 500px){
        display: flex;
      }
    }

  }
}

.content {
  //padding: 20px;
}

.footer {
  text-align: center;
  padding: 10px;
  background: var(--clr-primary-5);

  position: fixed;
  width: 100%;
  bottom: 0;
  p{
    margin-bottom: 0;
    color: var(--clr-primary-1) !important;
  }
}
</style>

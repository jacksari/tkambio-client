<script setup lang="ts">
import { useAuthStore } from '@/stores/storeAuth.ts'
const storeAuth = useAuthStore()



</script>


<template>
  <div>
    <header class="header">
      <nav class="">
        <div class="section-center">

          <span></span>
          <img src="/images/logo-completed.png" alt="Logo" />
          <button class="btn btn-error " @click="storeAuth.logout()">
            <v-icon name="hi-logout"></v-icon>
          </button>
        </div>
      </nav>
    </header>

    <main class="content">
<!--      <slot></slot>-->
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
    padding: 1rem 0;

    p {
    }

    img {
      height: 56px;
      width: 200px;
      object-fit: contain;
    }
  }
}

.content {
  padding: 20px;
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
    color: var(--clr-primary-9) !important;
  }
}
</style>

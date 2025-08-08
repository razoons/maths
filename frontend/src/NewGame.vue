<template>
  <v-app>
    <v-main class="pa-4" style="background-color:#0aaee3">
      <v-container>
        <v-btn @click="goToGame" size="x-large" rounded="pill" color="#f78d17" class="h-auto border-lg d-flex text-h1 elevation-24 ma-auto">ADDITION</v-btn>
      </v-container>
      <v-container>
        <v-btn @click="goToGame" size="x-large" rounded="pill" color="#f78d17" class="h-auto border-lg d-flex text-h1 elevation-24 ma-auto">SOUSTRACTION</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const message = ref('')
const router = useRouter()

const goToGame = () => {
  router.push('/game')
}


/*const fetchMessage = async () => {
  const res = await fetch(import.meta.env.VITE_API_URL + '/api/hello')
  const data = await res.json()
  message.value = data.message
}*/
</script>
<template>
  <v-app>
    <v-main class="pa-4" style="background-color:#0aaee3">
      <v-container>
        <v-btn @click="fetchMessage" size="x-large" rounded="pill" color="#f78d17" class="h-auto border-lg d-flex text-h1 elevation-24">JOUER</v-btn>
        <p v-if="message">{{ message }}</p>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')

const fetchMessage = async () => {
  const res = await fetch(import.meta.env.VITE_API_URL + '/api/hello')
  const data = await res.json()
  message.value = data.message
}
</script>

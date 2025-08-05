<template>
  <v-app>
    <v-main class="pa-4">
      <v-container>
        <v-btn @click="fetchMessage">Call API</v-btn>
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

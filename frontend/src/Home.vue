<template>
  <v-app>
    <v-main class="pa-4" style="background-color:#0aaee3">
      <v-container>
        <v-btn @click="goToGame" size="x-large" rounded="pill" color="#f78d17" class="h-auto border-lg d-flex text-h1 elevation-24 ma-auto">JOUER</v-btn>
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

</script>

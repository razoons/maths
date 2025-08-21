<template>
  <v-app>
    <v-main class="pa-4 d-flex ga-16 flex-column align-stretch justify-center" style="background-color:#0aaee3">
      <v-container>
        <v-btn-toggle v-model="operation" mandatory class="h-auto w-100 pa-8">
          <v-btn value="addition" rounded="pill" color="#f78d17"
            class="font-kid h-auto border-lg d-flex text-h2 elevation-12 ma-auto">Addition</v-btn>
          <v-btn value="soustraction" rounded="pill" color="#f78d17"
            class="font-kid h-auto border-lg d-flex text-h2 elevation-12 ma-auto">Soustraction</v-btn>
        </v-btn-toggle>
        <v-btn-toggle v-model="difficulty" mandatory class="h-auto w-100 pa-8">
          <v-btn value="facile" size="x-large" rounded="pill" color="#f78d17"
            class="font-kid h-auto border-lg d-flex text-h2 elevation-12 ma-auto">Facile</v-btn>
          <v-btn value="moyen" size="x-large" rounded="pill" color="#f78d17"
            class="font-kid h-auto border-lg d-flex text-h2 elevation-12 ma-auto">Moyen</v-btn>
          <v-btn value="difficile" size="x-large" rounded="pill" color="#f78d17"
            class="font-kid h-auto border-lg d-flex text-h2 elevation-12 ma-auto">Difficile</v-btn>
        </v-btn-toggle>
        <v-btn size="x-large" rounded="pill" class="h-auto border-lg d-flex text-h1 elevation-24 ma-auto w-90 font-kid mt-16"
          @click="goToGame" color="#D81B60">
          Commencer le jeu
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const message = ref('')
const router = useRouter()

const operation = ref("addition")
const difficulty = ref("facile")

const goToGame = () => {
  router.push('/current?operation=' + operation.value + '&difficulty=' + difficulty.value)
}


/*const fetchMessage = async () => {
  const res = await fetch(import.meta.env.VITE_API_URL + '/api/hello')
  const data = await res.json()
  message.value = data.message
}*/
</script>
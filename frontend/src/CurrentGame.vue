<template>
  <v-app>
    <v-main class="pa-4 d-flex ga-16 flex-column align-stretch justify-center" style="background-color:#0aaee3">
      <v-container>
        <v-sheet size="x-large" color="white"
          class="pa-16 font-kid text-h1 text-center elevation-24 border-lg rounded-xl">{{ problem }}</v-sheet>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-btn @click="answer(responses[0])" size="x-large" rounded="pill" color="#f78d17"
              class="h-auto border-lg d-flex text-h1 elevation-24 ma-auto w-100 font-kid" :style="selected === responses[0] ? (selected === correctAnswer ? 'background-color: #4caf50;' : 'background-color: #f44336;') : ''">{{ responses[0] }}</v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn @click="answer(responses[1])" size="x-large" rounded="pill" color="#f78d17"
              class="h-auto border-lg d-flex text-h1 elevation-24 ma-auto w-100 font-kid" :style="selected === responses[1] ? (selected === correctAnswer ? 'background-color: #4caf50;' : 'background-color: #f44336;') : ''">{{ responses[1] }}</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-btn @click="answer(responses[2])" size="x-large" rounded="pill" color="#f78d17"
              class="h-auto border-lg d-flex text-h1 elevation-24 ma-auto w-100 font-kid" :style="selected === responses[2] ? (selected === correctAnswer ? 'background-color: #4caf50;' : 'background-color: #f44336;') : ''">{{ responses[2] }}</v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn @click="answer(responses[3])" size="x-large" rounded="pill" color="#f78d17"
              class="h-auto border-lg d-flex text-h1 elevation-24 ma-auto w-100 font-kid" :style="selected === responses[3] ? (selected === correctAnswer ? 'background-color: #4caf50;' : 'background-color: #f44336;') : ''">{{ responses[3] }}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter();
const problem = ref('');
const correctAnswer = ref(0);
const responses = ref(['0', '0', '0', '0']);
const selected = ref(null);

const goToGame = () => {
  router.push('/game')
}

function generateProblem() {
  const num1 = Math.floor(Math.random() * 9) + 1;
  const num2 = Math.floor(Math.random() * 9) + 1;

  problem.value = `${num1} + ${num2}`;

  const correctAnswerTemp = num1 + num2;
  correctAnswer.value = correctAnswerTemp;
  const incorrectAnswers = new Set();

  while (incorrectAnswers.size < 3) {
    const offset = Math.floor(Math.random() * 3) + 1;
    const sign = Math.random() < 0.5 ? -1 : 1;
    const wrong = correctAnswerTemp + sign * offset;
    if (wrong !== correctAnswerTemp && wrong > 0) {
      incorrectAnswers.add(wrong);
    }
  }

  const allAnswers = [correctAnswerTemp, ...incorrectAnswers];
  responses.value = allAnswers.sort(() => Math.random() - 0.5);

}

function answer(selectedAnswer) {
  selected.value = selectedAnswer;
  setTimeout(() => {

    selected.value = null;
    generateProblem();
  }, 2000); // short delay to show color change
}

generateProblem();

/*const fetchMessage = async () => {
  const res = await fetch(import.meta.env.VITE_API_URL + '/api/hello')
  const data = await res.json()
  message.value = data.message
}*/
</script>
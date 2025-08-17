<template>
  <v-app>
    <!-- Barre de score -->
    <v-app-bar color="pink-darken-1 accent-4 " :height="160" class="border-lg rounded-xl" dark flat>
      <v-container class="d-flex flex-column align-center justify-center w-100">
        <!-- Score -->
        <div class="text-h1 font-kid text-center">
          Score : {{ score }}
        </div>

        <!-- Progress bar under the score -->
        <v-progress-linear v-model="progress" color="yellow-lighten-1" :height="30" class="w-100 mt-4" />
      </v-container>

    </v-app-bar>
    <v-main class="pa-4 d-flex ga-16 flex-column align-stretch justify-center" style="background-color:#0aaee3">
      <!-- Question -->
      <v-container>
        <v-sheet size="x-large" color="white"
          class="pa-16 font-kid text-h1 text-center elevation-24 border-lg rounded-xl">
          {{ problem }}
        </v-sheet>
      </v-container>

      <!-- Réponses -->
      <v-container>
        <v-row>
          <v-col cols="12" md="6" v-for="(resp, index) in responses" :key="index">
            <v-btn @click="answer(resp)" size="x-large" rounded="pill" color="#f78d17"
              class="h-auto border-lg d-flex text-h1 elevation-24 ma-auto w-100 font-kid"
              :style="selected === resp ? (selected === correctAnswer ? 'background-color: #4caf50;' : 'background-color: #f44336;') : ''">
              {{ resp }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-dialog v-model="showDialog" persistent>
      <v-card class="rounded-xl pa-8" color="pink-darken-1 accent-4">
        <v-card-title class="text-h1 text-center font-kid">
          Fin du Jeu!
        </v-card-title>

        <v-card-text class="text-center text-h2 font-kid">
          Ton score: <strong>{{ score }}</strong> / {{ nbrQuestions }}
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn size="x-large" rounded="pill"
              class="h-auto border-lg d-flex text-h1 elevation-24 ma-auto w-90 font-kid" @click="restartGame" style="background-color: #f78d17;">
            Recommencer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const nbrQuestions = 20;
const currentQuestion = ref(0);
const router = useRouter();
const problem = ref('');
const correctAnswer = ref(0);
const responses = ref(['0', '0', '0', '0']);
const selected = ref(null);
const score = ref(0);
const progress = computed(() => (currentQuestion.value / nbrQuestions * 100)); // percent (0 - 100)
const showDialog = ref(false);

function generateProblem() {
  currentQuestion.value++;
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
    if (selectedAnswer === correctAnswer.value) {
      score.value += 1;
    }
    selected.value = null;
    if (currentQuestion.value >= nbrQuestions) {
      showDialog.value = true;

    } else {
      // Generate next problem
      generateProblem();
    }
  }, 2000); // short delay to show color change
}

function restartGame(){
  score.value=0;
  currentQuestion.value=0;
  showDialog.value = false;
  generateProblem();
}

generateProblem();

/*const fetchMessage = async () => {
  const res = await fetch(import.meta.env.VITE_API_URL + '/api/hello')
  const data = await res.json()
  message.value = data.message
}*/
</script>
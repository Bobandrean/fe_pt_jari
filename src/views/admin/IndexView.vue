<template style="min-height: 100vh">
  <div v-if="getDashboardUser && getDashboardUser?.length > 0">
    <div>
      <h1 class="separator">
        <span class="separator-line"></span>
        <span class="separator-text">Top User</span>
        <span class="separator-line"></span>
      </h1>
    </div>
    <div>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          align="center"
          v-for="user in getDashboardUser"
          :key="user.id"
        >
          <v-card>
            <v-card>
              <v-card-title class="v-card--title justify-center">
                {{ user?.user_name }}
              </v-card-title>
              <div class="line-separator"></div>
              <!-- Add the line separator -->
              <!-- Add the v-divider component here -->

              <v-card-text class="v-card--title justify-center">
                <div style="max-height: 250px" v-html="user?.total_borrowings"></div>
              </v-card-text>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
  <div style="min-height: 100vh">
    <div v-if="getDashboardMonth">
      <h1 class="separator">
        <span class="separator-line"></span>
        <span class="separator-text">Total Booking This Month</span>
        <span class="separator-line"></span>
      </h1>

      <div>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto" max-width="344">
              <div class="d-flex align-center justify-center">
                <v-card-title> {{ getDashboardMonth }} </v-card-title>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { convertDateManualToIndo } from '../../utils/date'

import { ref, computed, onMounted, reactive, watchEffect } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()
const route = useRoute()
const router = useRouter()

const getDashboardUser = computed(() => dashboardStore.getDashboardUser())
const getDashboardMonth = computed(() => dashboardStore.getDashboardMonth())

onMounted(() => {
  dashboardStore.fetchDashboardUser('')
  dashboardStore.fetchDashboardMonth('')
})
// const getDashboardQuiz = computed(() => dashboardStore.getDashboardQuiz())
// onMounted(() => {
//   dashboardStore.fetchDashboardQuiz()
// })

// const handlePreview = async (id) => {
//   router.push(`/admin/news/preview/${id}`)
// }

// const handleAnswer = async (id) => {
//   router.push(`/admin/quiz/answer/${id}`)
// }

// const convertDateHandle = (date) => {
//   return convertDate(date)
// }

// const show = ref(false)
</script>

<style scooped>
.separator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.separator-line {
  flex-grow: 1;
  height: 1px;
  background-color: #000; /* Replace with your desired separator color */
}

.separator-text {
  margin: 0 10px;
  font-weight: medium;
}

.primary-button {
  background-color: #005eb8;
  color: white;
}

.primary-button:hover {
  background-color: #005eb8;
}

.save-button {
  background-color: green;
  color: white;
}

.save-button:hover {
  background-color: darkgreen;
}

.subtitle-text {
  font-size: 12px; /* Adjust the font size as needed */
}

.line-separator {
  border-bottom: 2px solid black; /* Customize the line style */
  margin: 8px 0; /* Adjust the margin to control spacing */
}
</style>

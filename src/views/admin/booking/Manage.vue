<template>
  <h1>Manage</h1>
  <v-row>
    <v-col cols="12">
      <v-btn class="text-button custom-button mt-2" @click="handleCreateBook" color="success">
        <v-icon>mdi-plus</v-icon>Create Book
      </v-btn>
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field
        v-model="search.name"
        label="Search"
        variant="outlined"
        append-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field
        v-model="search.namebook"
        label="Search"
        variant="outlined"
        append-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-col>
    <!-- <v-col cols="12" sm="4">
        <v-select
          v-model="search.orderBy"
          @update:model-value="handleSort()"
          :items="['newest', 'oldest', 'titled']"
          variant="outlined"
          label="Sort By"
        ></v-select>
      </v-col> -->
    <v-col cols="12" sm="4">
      <v-row align="center">
        <v-col cols="4" align="center"> Page </v-col>
        <v-col cols="4">
          <v-select
            item-value="label"
            item-title="label"
            :items="getTotalPages"
            @update:model-value="handlePage($event)"
            variant="outlined"
          ></v-select>
        </v-col>

        <v-col cols="4" align="center"> Of {{ getBookings?.last_page }} </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" v-for="booking in getBookings?.data" :key="booking.id">
      <v-card class="pa-3">
        <v-row>
          <v-col cols="6">
            <v-card-title class="news-title">User : {{ booking?.user.name }}</v-card-title>
            <v-card-title class="news-title">Buku : {{ booking?.book.name }}</v-card-title>

            <v-card-subtitle>
              <b>Tanggal booking: {{ convertDate(booking?.created_at) }}</b>
            </v-card-subtitle>
            <v-card-subtitle>
              <b>Updated Date: {{ convertDate(booking?.updated_at) }}</b>
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
  
  
  <script setup>
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, reactive, watchEffect } from 'vue'
import DialogCreateBookings from '@/components/Dialog/Booking/CreateBooking.vue'
import { useBookStore } from '@/stores/book'
import { useAuthStore } from '@/stores/auth'
import { convertDate } from '@/utils/date'

const bookStore = useBookStore()
const router = useRouter()
const getBookings = computed(() => bookStore.getBookings)

const search = reactive({
  name: '',
  namebook: '',
  orderBy: ''
})

const getTotalPages = computed(() => {
  const array = []

  if (bookStore.getBookings && bookStore.getBookings.links) {
    bookStore.getBookings.links.forEach((element) => {
      array.push(element.label)
    })
  }

  array.pop()
  array.shift()

  console.log(array, 'hi')

  return array
})

onMounted(() => {
  bookStore.fetchBookings('')
})

watchEffect(() => {
  const query = {}
  if (search.name !== '') {
    query.name = search.name
  }
  if (search.namebook !== '') {
    query.namebook = search.namebook
  }
  bookStore.fetchBookings(query)
})

const handlePage = async (page) => {
  console.log(page)

  const payload = {
    page
  }

  bookStore.fetchBookings(payload)
}

const handleCreateBook = () => {
  router.push('/admin/booking/create')
}
</script>
  
  <style scoped>
.edit-button {
  background-color: cyan;
  color: black;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.delete-button {
  background-color: red;
  color: black;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
<template>
  <h1>List</h1>
  <v-row class="mt-5">
    <v-col cols="3" md="4" class="ml-5">
      <v-text-field
        v-model="search.searchTitle"
        label="Search"
        variant="outlined"
        append-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-col>

    <v-col cols="3">
      <v-row align="center">
        <v-col cols="4" align="center">Page</v-col>
        <v-col cols="4">
          <v-select
            item-value="label"
            item-title="label"
            :items="getTotalPages"
            @update:model-value="handlePage($event)"
            variant="outlined"
          ></v-select>
        </v-col>
        <v-col cols="4" align="center">Of {{ getNews?.data?.last_page }}</v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
      align="center"
      v-for="book in getBooks?.data?.data"
      :key="book.id"
    >
      <v-card style="height: 100%">
        <v-card-title class="v-card--title justify-center">
          {{ book?.name }}
        </v-card-title>
        <div class="line-separator"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, onMounted, reactive, watchEffect } from 'vue'
import { useBookStore } from '@/stores/book'

const bookStore = useBookStore()
const getBooks = computed(() => bookStore.getBooks)

const search = reactive({
  searchTitle: '',
  orderBy: ''
})

const getTotalPages = computed(() => {
  const array = []

  bookStore.getBooks?.data?.links.forEach((element) => {
    array.push(element.label)
  })

  array.pop()
  array.shift()

  console.log(array)

  return array
})

onMounted(() => {
  bookStore.fetchBooks('')
})

watchEffect(() => {
  const query = {}
  if (search.searchTitle !== '') {
    query.searchTitle = search.searchTitle
  }
  if (search.searchorderBy !== '') {
    query.orderBy = search.orderBy
  }
  bookStore.fetchBooks(query)
})

const handlePage = async (page) => {
  console.log(page)

  const payload = {
    page
  }

  bookStore.fetchBooks(payload)
}
</script>
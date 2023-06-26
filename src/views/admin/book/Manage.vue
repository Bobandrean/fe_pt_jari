<template>
  <h1>Manage</h1>

  <DialogCreateBooks ref="refCreateBook"></DialogCreateBooks>

  <DialogEditBooks ref="refEditBooks"></DialogEditBooks>

  <v-row>
    <v-col cols="12">
      <v-btn class="text-button custom-button mt-2" @click="handleCreateBook" color="success">
        <v-icon>mdi-plus</v-icon>Create Book
      </v-btn>
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field
        v-model="search.searchTitle"
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
        <v-col cols="4" align="center"> Of {{ getBooks?.data?.last_page }} </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" v-for="book in getBooks?.data?.data" :key="book.id">
      <v-card class="pa-3">
        <v-row>
          <v-col cols="6">
            <v-card-title class="news-title">{{ book?.name }}</v-card-title>
            <v-card-subtitle>
              <b>Created Date: {{ convertDate(book?.created_at) }}</b>
            </v-card-subtitle>
            <v-card-subtitle>
              <b>Updated Date: {{ convertDate(book?.updated_at) }}</b>
            </v-card-subtitle>
          </v-col>
          <v-col cols="6" class="text-right my-2" align-self="center">
            <v-btn class="mb-2 mr-2 edit-button" @click="handleEditBook(book?.id)">Edit</v-btn>
            <v-btn class="mb-2 mr-2 delete-button" @click="handleDeleteBook(book?.id)"
              >Delete</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, reactive, watchEffect } from 'vue'
import DialogCreateBooks from '@/components/Dialog/Book/CreateBook.vue'
import DialogEditBooks from '@/components/Dialog/Book/EditBook.vue'
import { useBookStore } from '@/stores/book'
import { useAuthStore } from '@/stores/auth'
import { convertDate } from '@/utils/date'

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

const refCreateBook = ref(null)
const handleCreateBook = () => {
  refCreateBook.value.$refs.refCreateBook.open()
}

const refEditBooks = ref(null)
const handleEditBook = (id) => {
  refEditBooks.value.$refs.refEditBooks.open()
  bookStore.fetchDetailBooks(id)
}

const handleDeleteBook = (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this book?')
  if (confirmed) {
    bookStore.deleteBooks(id).then(() => {
      bookStore.fetchBooks('')
    })
  }
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
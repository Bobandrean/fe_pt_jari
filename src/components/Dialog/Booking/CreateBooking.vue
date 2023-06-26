<template>
  <BaseDialog ref="refCreateBookings">
    <section class="login pa-5 mt-5">
      <v-row class="mb-5 px-3">
        <h1 class="text-left">Create Bookings</h1>
        {{ getUser }}
      </v-row>
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-select
          label="User"
          :items="getUser"
          v-model="formValues.user_id"
          item-value="id"
          item-text="name"
          variant="outlined"
        ></v-select>

        <v-row class="mt-3">
          <v-col md="6"></v-col>
          <v-col md="3">
            <div class="d-flex justify-end mb-6">
              <v-btn block color="error">Cancel</v-btn>
            </div>
          </v-col>
          <v-col md="3">
            <div class="d-flex justify-end mb-6">
              <v-btn type="submit" block color="success">Submit</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </section>
  </BaseDialog>
</template>
    
    <script setup>
import BaseDialog from '@/components/Base/Dialog.vue'
import { reactive, ref, computed, onMounted } from 'vue'
import { useBookStore } from '@/stores/book'

import { required, minLength } from '@vuelidate/validators'

const bookStore = useBookStore()

const getUser = computed(() => bookStore.getListUser)

const formValues = reactive({
  user_id: null,
  book_id: '',
  borrow_time: ''
})

// Validation
const rules = {
  title: { required, minLength: minLength(3) },
  slug: { required },
  content: { required },
  short_content: { required }
}

onMounted(() => {
  bookStore.fetchUserList('')
})

const refCreateBookings = ref('')

const handleSubmit = () => {
  bookStore.createBook(formValues).then(() => {
    bookStore.fetchBooks('')
    refCreateBookings.value.close()
  })
}

const handleContent = (val) => {
  formValues.content = val
}
</script>
    
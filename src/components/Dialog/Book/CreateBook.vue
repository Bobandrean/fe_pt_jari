<template>
  <BaseDialog ref="refCreateBook">
    <section class="login pa-5 mt-5">
      <v-row class="mb-5 px-3">
        <h1 class="text-left">Create Book</h1>
      </v-row>
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formValues.name"
          label="Title"
          :rules="[rules.required]"
          required
          variant="outlined"
        ></v-text-field>

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
import { reactive, ref } from 'vue'
import { useBookStore } from '@/stores/book'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import ImageUploader from 'quill-image-uploader'

import { required, minLength } from '@vuelidate/validators'

const bookStore = useBookStore()

const formValues = reactive({
  name: ''
})

// Validation
const rules = {
  title: { required, minLength: minLength(3) },
  slug: { required },
  content: { required },
  short_content: { required }
}

const refCreateBook = ref('')

const handleSubmit = () => {
  bookStore.createBook(formValues).then(() => {
    bookStore.fetchBooks('')
    refCreateBook.value.close()
  })
}

const handleContent = (val) => {
  formValues.content = val
}
</script>
  
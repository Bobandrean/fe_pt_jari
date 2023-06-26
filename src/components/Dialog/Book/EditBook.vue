<template>
  <BaseDialog ref="refEditBooks">
    <section class="login pa-5 mt-5">
      <v-row class="mb-5" style="height: 50px">
        <h1 class="text-left">Edit Books</h1>
      </v-row>
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formValues.name"
          label="Title"
          required
          variant="outlined"
        ></v-text-field>
        <v-row>
          <v-col md="6"> </v-col>
          <v-col md="3">
            <div class="d-flex justify-end mb-6">
              <v-btn block color="warning"> Cancel </v-btn>
            </div>
          </v-col>
          <v-col md="3">
            <div class="d-flex justify-end mb-6">
              <v-btn type="submit" block color="success"> Submit </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </section>
  </BaseDialog>
</template>
  
<script setup>
import BaseDialog from '@/components/Base/Dialog.vue'
import { reactive, ref, computed, watch } from 'vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useBookStore } from '@/stores/book'

const bookStore = useBookStore()

const formValues = reactive({
  name: ''
})

const getDetailBook = computed(() => bookStore.getDetailBook)

const id = ref('')

watch(getDetailBook, (val) => {
  id.value = val[0].id
  formValues.name = val[0].name
})

const refEditBooks = ref('')

const handleSubmit = () => {
  bookStore.updateBooks(id.value, formValues).then(() => {
    bookStore.fetchBooks('')
    refEditBooks.value.close()
  })
}
</script>
  
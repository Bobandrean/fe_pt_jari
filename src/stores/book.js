import {
    ref,
    computed
} from 'vue'
import {
    defineStore
} from 'pinia'
import SERVICE from '@/services/book.js'
import Swal from 'sweetalert2'

export const useBookStore = defineStore('book', () => {
    const books = ref([])

    const setBooks = (value) => {
        books.value = value
    }

    const detailBook = ref({})

    const setDetailBooks = (data) => {
        detailBook.value = data
    }

    const bookings = ref([])

    const setBooking = (value) => {
        bookings.value = value
    }


    const listUser = ref([])

    const setUserList = (value) => {
        listUser.value = value
    }

    const listBook = ref([])

    const setBookList = (value) => {
        listBook.value = value
    }

    const getBooks = computed(() => books.value)

    const getDetailBook = computed(() => detailBook.value)

    const getBookings = computed(() => bookings.value)

    const getListUser = computed(() => listUser.value)

    const getListBook = computed(() => listBook.value)


    const fetchBooks = async (payload) => {
        const query = {
            namebook: payload.searchTitle ? payload.searchTitle : '',
            page: payload.page ? payload.page : ''
        }
        try {
            const res = await SERVICE.getBooks(query)
            setBooks(res)
        } catch (error) {
            console.error(error)
        }
    }

    async function fetchDetailBooks(id) {
        try {
            const res = await SERVICE.detailBook({
                id
            })
            setDetailBooks(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    async function createBook(payload) {
        try {
            const res = await SERVICE.createBook({
                payload
            })
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Berhasil Membuat News'
            })
            return res
        } catch (error) {
            console.error(error)
        }
    }

    async function updateBooks(id, payload) {
        try {
            const res = await SERVICE.updateBook({
                id,
                payload
            })
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Berhasil Mengubah News'
            })

            return res
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteBooks(id) {
        try {
            const res = await SERVICE.deleteBook({
                id
            })
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Berhasil Mengubah News'
            })

            return res
        } catch (error) {
            console.error(error)
        }
    }

    const fetchBookings = async (payload) => {
        const query = {
            name: payload.name ? payload.name : '',
            namebook: payload.namebook ? payload.namebook : '',
            page: payload.page ? payload.page : ''
        }
        try {
            const res = await SERVICE.getBooking(query)
            setBooking(res)
        } catch (error) {
            console.error(error)
        }
    }

    async function createBookings(payload) {
        console.log(payload, 'Store');
        try {
            const res = await SERVICE.createBooking({
                payload
            })
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Berhasil Membuat News'
            })
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const fetchUserList = async () => {

        try {
            const res = await SERVICE.getListUser()
            setUserList(res)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchBookList = async () => {

        try {
            const res = await SERVICE.getListBook()
            setBookList(res)
        } catch (error) {
            console.error(error)
        }
    }


    return {
        books,
        getBooks,
        detailBook,
        getDetailBook,
        fetchBooks,
        setBooks,
        createBook,
        fetchDetailBooks,
        setDetailBooks,
        updateBooks,
        deleteBooks,
        //Bookings
        createBookings,
        fetchBookings,
        setBooking,
        bookings,
        getBookings,
        fetchUserList,
        setUserList,
        getListUser,
        fetchBookList,
        setBookList,
        getListBook,

    }
})
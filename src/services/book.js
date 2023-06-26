import Api from '@/utils/api.js'

class BookServices {

    async getBooks(query) {
        return await Api.doGet(`book/index?${new URLSearchParams(query || '').toString()}`)
            .then((res) => res)
            .catch((err) => err)
    }

    async createBook({
        payload
    }) {
        const res = await Api.doPost(`book/create`, payload)
        return res
    }

    async updateBook({
        id,
        payload
    }) {
        const res = await Api.doPost(`book/update/${id}`, payload)
        return res
    }

    async deleteBook({
        id
    }) {
        const res = await Api.doGet(`book/delete/${id}`)
        return res
    }

    async detailBook({
        id
    }) {
        const res = await Api.doGet(`book/detail/${id}`)
        return res
    }
    //BOOKING
    async getBooking(query) {
        return await Api.doGet(`bookborrowing/index?${new URLSearchParams(query || '').toString()}`)
            .then((res) => res)
            .catch((err) => err)
    }

    async createBooking({
        payload
    }) {
        const res = await Api.doPost(`bookborrowing/create`, payload)
        return res
    }

    async getListUser() {
        return await Api.doGet(`bookborrowing/list-user`)
            .then((res) => res)
            .catch((err) => err)
    }

    async getListBook() {
        return await Api.doGet(`bookborrowing/list-book`)
            .then((res) => res)
            .catch((err) => err)
    }
}

export default new BookServices()
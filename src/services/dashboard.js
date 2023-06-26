import Api from '@/utils/api.js'

class DashboardServices {
    async getUserDashboard() {
        return await Api.doGet(`dashboard/user`)
            .then((res) => res)
            .catch((err) => err)
    }

    async getMonthDashboard() {
        return await Api.doGet(`dashboard/month`)
            .then((res) => res)
            .catch((err) => err)
    }

}



export default new DashboardServices()
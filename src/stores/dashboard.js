import {
    ref,
    computed
} from 'vue'
import {
    defineStore
} from 'pinia'
import SERVICE from "@/services/dashboard.js"

export const useDashboardStore = defineStore('dashboard', () => {
    const dashboarduser = ref([]);
    const dashboardmonth = ref([]);

    const getDashboardUser = () => {
        return dashboarduser.value;
    };

    const setDashboardUser = (value) => {
        dashboarduser.value = value
    }

    const getDashboardMonth = () => {
        return dashboardmonth.value;
    };

    const setDashboardMonth = (value) => {
        dashboardmonth.value = value
    }

    const fetchDashboardUser = async () => {
        try {

            const res = await SERVICE.getUserDashboard();

            setDashboardUser(res.data)

        } catch (error) {
            console.error(error)
        }
    };

    const fetchDashboardMonth = async () => {
        try {
            const res = await SERVICE.getMonthDashboard();

            setDashboardMonth(res.data)

        } catch (error) {
            console.error(error)
        }
    }

    return {
        dashboarduser,
        getDashboardUser,
        fetchDashboardUser,
        dashboardmonth,
        fetchDashboardMonth,
        getDashboardMonth
    }
})
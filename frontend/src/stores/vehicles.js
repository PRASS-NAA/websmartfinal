import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./user";


export const useVehicleStore = defineStore('vehicle', {
    state : () => ({
        vehicles: []
    }),

    actions: {
        async fetchOwnedVehicles() {
    try 
    {
        const userStore = useUserStore()
        const email = userStore.email

        if (!email) 
        {
            console.log("Email not available yet. Skipping vehicle fetch.")
            return
        }

        const res = await axios.get(`http://localhost:3333/vehicles/?email=${email}`)
        this.vehicles = res.data.data
    } catch (err) {
        console.log("error during fetching vehicles !! ", err)
    }
}

    }
})
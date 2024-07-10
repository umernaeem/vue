<template>
    <section id="Upcoming" class="w-1/2 text-primary py-6">
        <h2 class="font-semibold text-2xl">Upcoming Cake Days</h2>
        <div v-if="upcomingCakeDaysData" v-for="upcomingdata in upcomingCakeDaysData" :key="upcomingCakeDaysData.cake_date" class="shadow-md px-4 border-primary border mt-2 py-4 rounded-md">
            <p class="text-lg font-semibold">Date: <span class="font-normal">{{ upcomingdata.cake_date }}</span></p>
            <p class="text-lg font-semibold">Name(s): <span class="font-normal">{{ upcomingdata.developer_names }}</span></p>
            <p class="text-lg font-semibold">Cake Type: <span class="font-normal">{{ upcomingdata.cake_type }}</span></p>
        </div>
        
        <p v-if="anyDataAvailable" class="text-base">No Birthdays are left to be classed as "upcoming" for this year</p>
    </section>
</template>

<script setup>
import {onMounted, ref} from "vue"
import {upcomingCakeDays} from "../../http/cakeday-api"
const upcomingCakeDaysData = ref(null);
const anyDataAvailable = ref(false);
onMounted(async() => {
    const {data} = await upcomingCakeDays();
    upcomingCakeDaysData.value = data.data;
    if(data.data.length==0)
    {
        anyDataAvailable.value = true;
    }
})

</script>
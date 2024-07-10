<template>
    <section id="Today" class="container text-primary py-6">
        <h2 class="font-semibold text-2xl">Today's Birthday Cake</h2>
        <div v-if="todayCakeDayData" v-for="todaydata in todayCakeDayData" :key="todayCakeDayData.cake_date" class="flex gap-3 shadow-md px-4 border-primary border mt-2 py-4 rounded-md">
            <div class="w-2/3 mt-3">
                <p class="text-lg font-semibold">Date: <span class="font-normal">{{ todaydata.cake_date }}</span></p>
                <p class="text-lg font-semibold">Name(s): <span class="font-normal">{{ todaydata.developer_names }}</span></p>
                <p class="text-lg font-semibold">Cake Type: <span class="font-normal">{{ todaydata.cake_type }}</span></p>
            </div>
            <div class="w-1/3">
                <img v-if="todaydata.cake_type=='Small'" class="w-32 h-32" src="../../assets/images/small_cake.png" alt="Small Cake">
                <img v-if="todaydata.cake_type=='Large'" class="w-32 h-32" src="../../assets/images/large_cake.png" alt="Large Cake">
            </div>
        </div>
        <p v-if="anyDataAvailable" class="text-xl">No Birthday cake today, Sorry....</p>
    </section>
</template>

<script setup>
import {onMounted, ref} from "vue"
import {todayCakeDay} from "../../http/cakeday-api"
const todayCakeDayData = ref(null);
const anyDataAvailable = ref(false);
onMounted(async() => {
    const {data} = await todayCakeDay();
    todayCakeDayData.value = data.data;
    if(data.data.length==0)
    {
        anyDataAvailable.value = true;
    }
})
</script>

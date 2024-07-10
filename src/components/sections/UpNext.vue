<template>
    <section id="UpNext" class="w-1/2 text-primary py-6">
        <h2 class="font-semibold text-2xl">Next Cake Days</h2>
        <div v-if="nextCakeDayData" v-for="nextdata in nextCakeDayData" :key="nextCakeDayData.cake_date" class="shadow-md px-4 border-primary border mt-2 py-4 rounded-md">
            <p class="text-lg font-semibold">Date: <span class="font-normal">{{ nextdata.cake_date }}</span></p>
            <p class="text-lg font-semibold">Name(s): <span class="font-normal">{{ nextdata.developer_names }}</span></p>
            <p class="text-lg font-semibold">Cake Type: <span class="font-normal">{{ nextdata.cake_type }}</span></p>
            <img v-if="nextdata.cake_type=='Small'" class="w-64 h-64" src="../../assets/images/small_cake.png" alt="Small Cake">
            <img v-if="nextdata.cake_type=='Large'" class="w-64 h-64" src="../../assets/images/large_cake.png" alt="Large Cake">
        </div>
        <p v-if="anyDataAvailable" class="text-base">No Birthdays are left to be classed as "Next" for this year</p>
    </section>
</template>

<script setup>
import {onMounted, ref} from "vue"
import {nextCakeDay} from "../../http/cakeday-api"
const nextCakeDayData = ref(null);
const anyDataAvailable = ref(false);
onMounted(async() => {
    const {data} = await nextCakeDay();
    nextCakeDayData.value = data.data;
    if(data.data.length==0)
    {
        anyDataAvailable.value = true;
    }
})
</script>
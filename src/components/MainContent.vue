<template>
    <Welcome :data="keyIndex"/>
    <Today :key="keyIndex.count"/>
    <div class="container flex gap-6">
        <UpNext :key="keyIndex.count"/>
        <Upcoming :key="keyIndex.count"/>
    </div>
</template>

<script setup>
    import Welcome from './sections/Welcome.vue';
    import Today from './sections/Today.vue';
    import UpNext from './sections/UpNext.vue';
    import Upcoming from './sections/Upcoming.vue';
    import { ref,reactive } from "vue";
    const keyIndex = reactive({ count: 0 })
</script>
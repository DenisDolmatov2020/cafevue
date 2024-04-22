<template>
  <div>
    <NoData v-if="!items?.length" />

    <CoreTable v-else :items="items" />
  </div>
</template>

<script setup lang="ts">
import CoreTable from "@/components/Core/CoreTable.vue";
import NoData from "@/components/Core/NoHaveData.vue";

import api from "@/api";
import {ref} from "vue";

const items = ref<Item[]>([]);

const loginModal = ref(false);
// Используем async/await для ожидания завершения промиса
const fetchData = async () => {
  items.value = await api.getItems();
};

// Вызываем функцию для получения данных
fetchData();

</script>

<style lang="scss" scoped>
/* Add your styles here */
</style>

<script setup>
import { shallowRef } from 'vue';

import Items from './Items.vue';
import Categories from './Categories.vue';
import CoreHeader from './Core/CoreHeader.vue';
import CoreButton from "@/components/Core/CoreButton.vue";

const currentTab = shallowRef(Items);
const tabs = [Items, Categories];
</script>

<template>
  <CoreHeader :is-button-back="true" @click-button="$router.push('/')" />

  <div class="tabs">
    <CoreButton
        v-for="(tab, index) in tabs"
        :key="tab"
        :title="index ? 'Categories' : 'Menu'"
        @clickButton="currentTab = tab"
    />
  </div>

  <div class="tab-content">
    <component :is="currentTab" />
  </div>

</template>

<style lang="scss" scoped>
.tabs {
  margin: 50px auto;
  display: flex;
  justify-content: center;
  gap: 2vw;
}

.tab-content {
  margin-top: 20px;
}
</style>


<template>
  <Login v-if="loginModal" @close="loginModal = false" />

  <CoreHeader @click-button="clickButton" />

  <div id="main" class="main menu">
    <section
        v-for="category in categories"
        :key="'category_#' + category.id"
        class="menu-section"
    >
      <h2 class="section-title">
        {{ category.title }}
      </h2>
      <div class="block menu-block">
        <p
            v-for="item in category.items"
            :key="item.id"
            class="item"
        >
          {{ item.title }}
          <span class="item-price right">
            {{ item.price }} &#8381
          </span>
        </p>
      </div>

      <div
          v-for="subcategory in category.childCategories"
          :key="'subcategory_#' + subcategory"
          class="block menu-block"
      >
        <h3 class="block-title">
          {{ subcategory.title }}
        </h3>

        <div
            v-for="item_ in subcategory.items"
            :key="'item_#' + item_"
            class="item"
        >
          <p>
            {{ item_.title }}
            <span class="item-price right">
              {{ item_.price }} &#8381
            </span>
          </p>
          <p v-if="item_.info" class="more">
            {{ item_.info }}
          </p>
        </div>
        <div class="item">
          <p>Iced Tea<span class="item-price right">1.85 / 1.65</span></p>
          <p class="more">black, passion, zen</p>
        </div>
        <p class="item">Steamer<span class="item-price right">2.75 / 2.25 / 2.00</span></p>
        <p class="item">Tea Latte<span class="item-price right">2.75 / 2.50 / 2.25</span></p>
      </div>
      <div class="block menu-block">
        <h3 class="block-title">Espresso Drinks</h3>
        <div class="item">
          <p>Americano<span class="item-price right">2.50 / 2.00 / 1.75</span></p>
          <p class="more">espresso with hot water</p>
        </div>
        <div class="item">
          <p>Blondie<span class="item-price right">4.00 / 3.50 / 2.75</span></p>
          <p class="more">latte with caramel and white chocolate</p>
        </div>
        <!-- Другие элементы Espresso Drinks ... -->
      </div>
      <div class="block menu-block">
        <h3 class="block-title">Extras</h3>
        <p class="item">Espresso Shot<span class="item-price right">0.50</span></p>
        <p class="item">Flavor Shot<span class="item-price right">0.50</span></p>
      </div>
      <div class="block menu-block">
        <h3 class="block-title">Ice Cream</h3>
        <!-- Элементы Ice Cream ... -->
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import api from "@/api";
import {computed, ref} from "vue";
import CoreHeader from "@/components/Core/CoreHeader.vue";
import Login from "@/components/Login.vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

const categories = ref([]);

const loginModal = ref(false);
// Используем async/await для ожидания завершения промиса
const fetchData = async () => {
  try {
    categories.value = await api.getMenuData();
    console.log('data', categories.value);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Вызываем функцию для получения данных
fetchData();

const clickButton = () => {
  if (isAuthenticated.value) {
    router.push('/admin')
  } else {
    loginModal.value = true
  }
}
</script>

<style lang="scss" scoped>
.menu {
  font-family:
      PredatorsRegular,
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif;
}

.menu-section,
.info-aside {
  min-width: 100%;
  float: left;
  margin: 0 10px;
}

.info-aside {
  width: 300px;
}

.section-title {
  margin: 0;
  padding: 0 1em;
  background: #000;
  font-size: 2em;
  color: #fff;
  font-weight: 600;
}

.block {
  float: left;
  width: 300px;
  min-height: 300px;
  padding-top: 10px;
  color: #ffffff;
  text-shadow: 1px 0 0 white, 1px 1px 0 black;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.3);
}

.block-title {
  padding: 0 10px;
  background: rgba(0, 0, 0, .7);
  margin-bottom: 0;
}

a {
  color: #000;
}

.art {
  margin: 10px 0 0 0;
  background: #000;
  color: #fff;
}

.art h2 {
  padding: 0;
}

.art a {
  color: #fff;
}

.item {
  border-bottom: dotted 1px #000;
}

p {
  margin-bottom: 0;
}

.more {
  margin: 0;
  font-size: 0.8em;
}

.right {
  float: right;
}

.item {
  padding: 0 15px;
  &-price {
    float: right;
  }
}

</style>

<script setup lang="ts">
import {ref} from "vue";
import CoreButton from "@/components/Core/CoreButton.vue";
import api from "@/api";

interface ComponentProps {
  items?: Item[]; // Добавляем тип для items
}

defineProps<ComponentProps>();


const isNewActive = ref<boolean>(false);

const newItem = ref({
  image: null,
  title: '',
  info: '',
  categories: ''
})

const handleFileChange = (event: any) => {
  console.log()
  const fileInput = event.target;
  newItem.value.image = fileInput?.files?.[0];
};

const clickButton = () => {
  if (!isNewActive.value) {
    isNewActive.value = true
  } else {
    createItem()
  }
}

const createItem = async () => {
  try {
    const categoriesArray = newItem.value?.categories?.split(' ');
    // Преобразование изображения в бинарный формат
    const imageFile = newItem.value.image;
    const imageBuffer = await readFileAsArrayBuffer(imageFile);

    const response = await api.createItem({
      title: newItem.value.title,
      categories: categoriesArray,
      image: imageBuffer,
    });

    console.log('RESPONSE', response);
  } catch (error) {
    console.error(error);
  }
};

// Функция для чтения файла в виде ArrayBuffer
const readFileAsArrayBuffer = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};
</script>

<template>
  <div class="table-new">
    <div class="table-new-inputs" :class="{ active: isNewActive }">
      <span :class="{ active: isNewActive }">
        <input type="file" ref="fileInput" @change="handleFileChange" />
        <input v-model="newItem.title" type="text" />
        <input v-model="newItem.info" type="text" />
        <input v-model="newItem.categories" />
      </span>
    </div>

    <div :class="{ active: isNewActive }">
      <CoreButton
        title="Add new"
        @clickButton="clickButton"
      />
    </div>

  </div>

  <table>
    <thead>
    <tr>
      <th>Image</th>
      <th>Title</th>
      <th>Description</th>
      <th>Price</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id" >
        <td><strong>{{ item.title }}</strong></td>
        <td><strong>{{ item.title }}</strong></td>
        <td>{{ item?.info || 'No have info' }}</td>
        <td>{{ item.price }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
.table-new,
table {
  border-collapse: separate;
  font-size: 14px;
  line-height: 24px;
  margin: auto;
  text-align: left;
  width: 800px;
}

.table-new {
  display: flex;
  flex-grow: unset;
  flex-shrink: unset;
  cursor: pointer;

  &-inputs {
    min-width: calc(100% - 220px);

    span {
      display: flex;
      gap: 5px;
      visibility: hidden;
      opacity: 0;

      &.active {
        opacity: 1;
        visibility: visible;
        transition: opacity 1.5s ease 1s;
      }
    }

    &.active {
      transition: min-width 1s ease;
      min-width: 100%;
      margin-right: 5px;
    }

    input {
      flex: 1;
      background: #0E1119;
      color: #E5E7EB;
      font-family: Verdana, cursive;
      border-radius: 10px;
      padding: 15px 10px 14px;
      border: none;
    }
  }

  &-button {
    font-family: PredatorsRegular, sans-serif;
    text-decoration: overline;
    letter-spacing: 2px;
    font-size: 1rem;
    line-height: 0.5rem;
    width: 220px;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
  }
}

th {
  background: linear-gradient(#333, #444);
  border-left: 1px solid #555;
  border-right: 1px solid #777;
  border-top: 1px solid #555;
  border-bottom: 1px solid #333;
  box-shadow: inset 0 1px 0 #999;
  color: #fff;
  font-weight: bold;
  padding: 10px 15px;
  position: relative;
  text-shadow: 0 1px 0 #000;
}

th:after {
  background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,.5));
  content: '';
  display: block;
  height: 25%;
  left: 0;
  margin: 1px 0 0 0;
  position: absolute;
  top: 25%;
  width: 100%;
}

th:first-child {
  border-left: 1px solid #777;
  box-shadow: inset 1px 1px 0 #999;
}

th:last-child {
  box-shadow: inset -1px 1px 0 #999;
}

td {
  border-right: 1px solid #fff;
  border-left: 1px solid #e8e8e8;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #e8e8e8;
  padding: 10px 15px;
  position: relative;
  transition: all 300ms;
}

td:first-child {
  box-shadow: inset 1px 0 0 #fff;
}

td:last-child {
  border-right: 1px solid #e8e8e8;
  box-shadow: inset -1px 0 0 #fff;
}

tr {
  color: #fff;
  background: rgba(0, 0, 0, .8);
}

tr:nth-child(odd) td {
  background: rgba(0, 0, 0, .8);
}

tr:last-of-type td {
  box-shadow: inset 0 -1px 0 #fff;
}

tr:last-of-type td:first-child {
  box-shadow: inset 1px -1px 0 #fff;
}

tr:last-of-type td:last-child {
  box-shadow: inset -1px -1px 0 #fff;
}

tbody:hover td {
  color: transparent;
  text-shadow: 0 0 3px #fff;
}

tbody:hover tr:hover td {
  color: #fff;
  text-shadow: 0 1px 0 #000;
}
</style>

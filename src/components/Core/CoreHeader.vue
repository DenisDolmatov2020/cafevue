<script setup lang="ts">
import {computed} from "vue";
import { useStore } from "vuex";

const store = useStore();

defineProps({
  title: {
    type: String,
    default: 'MENU CAFE',
  },
  'isButtonBack': {
    type: Boolean,
    default: false
}});

const isAuthenticated = computed(() => store.getters.isAuthenticated);
</script>

<template>
  <header class="header">
    <h1 class="header-title">
      {{ $route.name?.toString().toUpperCase() }}
    </h1>
    <button
        class="header-button"
        :class="{ 'button-login': isAuthenticated, 'button-back': isButtonBack }"
        @click="$emit('click-button')"
    >
      {{ !isButtonBack ? 'Only stuff' : 'Back to menu' }}
    </button>
  </header>
</template>

<style lang="scss" scoped>
@import '../../assets/main.scss';

.header {
  display: flex;
  justify-content: space-between;
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

  &-button {
    text-shadow: 1px 1px 0 black, -1px -1px 0 black;
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

    letter-spacing: .2rem;
    background-color: darkred;
    border: 0 solid #E5E7EB;
    box-sizing: border-box;
    color: #000000;
    display: flex;
    font-size: 1.25rem;
    justify-content: center;
    align-items: center;
    padding: .5rem 1rem;
    position: relative;
    text-align: center;
    text-decoration: none #000000 solid;
    text-decoration-thickness: auto;
    width: 100%;
    max-width: 160px;
    cursor: pointer;
    transform: rotate(-2deg);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &.button-login {
      background-color: darkgreen;
    }
    &.button-back {
      background-color: darkgoldenrod;
    }

    &:focus {
      outline: 0;
    }

    &:after {
      content: '';
      position: absolute;
      border: 1px solid #000000;
      bottom: 4px;
      left: 4px;
      width: calc(100% - 1px);
      height: calc(100% - 1px);
    }

    &:hover {
      color: #E5E7EB;
      text-shadow: 1px 1px 3px black, -2px -2px 3px black;
      &:after {
        bottom: 2px;
        left: 2px;
      }
    }

    @media (min-width: $pad-screen) {
      padding: .5rem 2rem;
      font-size: 1.5rem;
    }
  }

  &-title {
    font-size: 7em;
    line-height: 6rem;
    margin: 0.2em;
    color: black;

    @media (max-width: $mobile-screen) {
      font-size: 4rem;
    }
  }
}
</style>

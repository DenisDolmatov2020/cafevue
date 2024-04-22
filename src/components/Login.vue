<script setup lang="ts">
import { ref } from 'vue';
import api, { setAuthToken } from '@/api';

const data = ref({
  email: '',
  password: '',
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};

const login = async () => {
  try {
    const response = await api.loginUser(data.value);
    if (response?.token) {
      setAuthToken(response.token);
      close();
    }
  } catch (error) {
    console.error('Error in login:', error);
    // Обработка ошибок входа
  }
};
</script>


<template>
  <div class="background">
    <div class="shape"></div>
    <div class="shape"></div>
  </div>
  <div class="form">
    <h3>Login Here</h3>

    <label for="username">Username</label>
    <input v-model="data.email" type="text" placeholder="Email or Phone" id="username">

    <label for="password">Password</label>
    <input v-model="data.password" type="password" placeholder="Password" id="password">

    <button class="button" @click="login">Log In</button>

    <button class="button button-close" @click="close">Close</button>
  </div>
</template>

<style lang="scss" scoped>
.background{
  width: 430px;
  height: 430px;
  position: absolute;
  transform: translate(-50%,-50%);
  left: 50%;
  top: 50%;

  .shape{
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;

    &:first-child{
      background: linear-gradient(
              #1845ad,
              #23a2f6
      );
      left: -80px;
      top: -80px;
    }

    &:last-child{
      background: linear-gradient(
              to right,
              #ff512f,
              #f09819
      );
      right: -30px;
      bottom: -80px;
    }
  }
}

.form{
  width: 400px;
  background-color: rgba(255,255,255,0.13);
  position: absolute;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.1);
  box-shadow: 0 0 40px rgba(8,7,16,0.6);
  padding: 50px 35px;

  *{
    font-family: 'Poppins',sans-serif;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }

  h3{
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }
}

label{
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}
input{
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255,255,255,0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
::placeholder{
  color: #e5e5e5;
}
.button {
  margin-top: 20px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;

  &-close {
    color: #ffffff;
    background: #2c3e50;
  }
}
.social{
  margin-top: 30px;
  display: flex;

  div{
    background: red;
    width: 150px;
    border-radius: 3px;
    padding: 5px 10px 10px 5px;
    background-color: rgba(255,255,255,0.27);
    color: #eaf0fb;
    text-align: center;

    &:hover{
      background-color: rgba(255,255,255,0.47);
    }
    .fb{
      margin-left: 25px;
    }

    i{
      margin-right: 4px;
    }
  }
}

</style>

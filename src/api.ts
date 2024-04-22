// api.ts

import axios from "axios";
import type { AxiosResponse } from "axios";
import store from "@/store";

class Api {
    instance = axios.create({
        baseURL: "http://localhost:3000",
        timeout: 10000,
    });

    constructor() {
        // Инициализация axios с базовыми настройками
        this.instance.interceptors.request.use(
            (config) => {
                // Перехватчик запроса, можно добавить логику до отправки запроса
                // Например, добавить заголовок авторизации
                const token = store.getters.authToken;
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    // Пример метода для выполнения GET-запроса
    async get<T>(url: string): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.instance.get(url);
            return response.data;
        } catch (error) {
            console.error(`Error in GET request (${url}):`, error);
            throw error;
        }
    }

    // Пример метода для выполнения POST-запроса
    async post<T>(url: string, data: any): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.instance.post(url, data);
            return response.data;
        } catch (error) {
            console.error(`Error in POST request (${url}):`, error);
            throw error;
        }
    }

    // Добавьте другие методы для различных типов запросов

    // Метод для выполнения запроса на вход пользователя
    async loginUser(data: { email: string, password: string }): Promise<{ token: string }> {
        return await this.post('/user/login', data);
    }

    // Метод для получения данных меню
    async getMenuData(): Promise<any> {
        return await this.get('/category/tree');
    }

    // Метод для получения элементов
    async getItems(): Promise<Item[]> {
        return await this.get('/item');
    }

    async getCategories(): Promise<Category[]> {
        return await this.get('/category');
    }

    // Метод для создания элемента
    async createItem(data: any): Promise<any> {
        return await this.post('/item', data);
    }
}

// Создание экземпляра класса API
const api = new Api();

// Функция для установки токена авторизации
export const setAuthToken = (token: string): void => {
    if (token) {
        api.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        store.dispatch('login', token);
    } else {
        delete api.instance.defaults.headers.common['Authorization'];
        store.dispatch('logout');
    }
};

export default api;

// Определение интерфейса для модели User
interface User {
    id: number;
    email: string;
    name?: string;
    password: string;
    items: Item[];
    categories: Category[];

    createdAt: string;
    updatedAt: string;
}

// Определение интерфейса для модели Category
interface Category {
    id: number;
    title: string;
    info?: string;
    user: User;
    userId: number;
    items: Item[];
    parentCategory?: Category;
    parentCategoryId?: number;
    childCategories: Category[];

    createdAt: string;
    updatedAt: string;
}

// Определение интерфейса для модели Item
interface Item {
    id: number;
    title: string;
    price: number;
    published: boolean;
    user: number;
    userId: number;
    categories: Category[];
    image?: string;

    createdAt: string;
    updatedAt: string;
}

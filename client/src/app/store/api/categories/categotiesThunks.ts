import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories`);
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        
        // const categories = [
        //     { icon: "fa-solid fa-music", title: "Concerts", count: 156 },
        //     { icon: "fa-solid fa-trophy", title: "Sports", count: 89 },
        //     { icon: "fa-solid fa-ticket", title: "Theater", count: 64 },
        //     { icon: "fa-solid fa-microphone", title: "Comedy", count: 42 },
        //     { icon: "fa-solid fa-film", title: "Film", count: 37 },
        //     { icon: "fa-solid fa-utensils", title: "Food and Drink", count: 29 },
        //     { icon: "fa-solid fa-gamepad", title: "Gaming", count: 18 },
        //     { icon: "fa-solid fa-users", title: "Conferences", count: 24 },
        // ];

        return await response.json();
        // return categories
    }
);

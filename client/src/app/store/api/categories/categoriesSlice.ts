import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categotiesThunks"

interface ICategory {
    title: string;
    count: number;
}
  
interface ICategoriesState {
    items: ICategory[];
    loading: boolean;
    error: string | null;
}
  
const initialState: ICategoriesState = {
    items: [],
    loading: false,
    error: null,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategories.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Unknown error";
        });
    },
  });
  
  export default categoriesSlice.reducer;
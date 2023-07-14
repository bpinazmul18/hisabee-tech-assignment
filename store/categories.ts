import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoriesState } from "@/models/Category";
import { RootState } from "./reducer";

const initialState: CategoriesState = {
  list: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategoryList: (state, action: PayloadAction<string[]>) => {
      state.list = action.payload;
    },
  },
});

export const selectCategoryList = (state: RootState) => state.entities.categories.list

export const { setCategoryList } = categoriesSlice.actions;
export default categoriesSlice.reducer;

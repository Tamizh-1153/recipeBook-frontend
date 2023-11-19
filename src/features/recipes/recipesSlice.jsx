import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes:null,

}

const recipesSlice = createSlice({
    name:'recipes',
    initialState,
    reducers:{
        addRecipes:(state,{payload})=>{
            state.recipes=payload
        }
    }
})

export const  {addRecipes} = recipesSlice.actions

export default recipesSlice.reducer
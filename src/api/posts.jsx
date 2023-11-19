import axios from "axios"
import { toast } from "react-toastify"

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASEURL}/api/v1`,
})

export const getUserInfo = async () => {
  try {
    const response = await api.get("/user/info", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return response.data
  } catch (error) {
    toast.error("Error getting user info")
    throw error
  }
}

export const createUser = async ({ name, email, password }) => {
  try {
    const res = await api.post("/register", { name, email, password })
    return res.data
  } catch (error) {
    toast.error("Error registering user")
    throw error
  }
}

export const userLogin = async ({ email, password }) => {
  try {
    const res = await api.post("/login", { email, password })
    return res.data
  } catch (error) {
    toast.error("Error Logging in")
    throw error
  }
}

export const forgotPassword = async (email) => {
  try {
    const res = await api.post("/forgot_password", { email })
    return res.data
  } catch (error) {
    toast.error("Error sending password reset link")
    throw error
  }
}

export const resetPassword = async ({ id, token, password }) => {
  try {
    const res = await api.post(`/reset_password/${id}/${token}`, {
      password,
    })
    return res.data
  } catch (error) {
    toast.error("Error updating password")
    throw error
  }
}

export const getAllRecipes = async () => {
  try {
    const res = await api.get("/recipe/all")
    return res.data
  } catch (error) {
    toast.error("Error getting all recipes")
  }
}

export const getRecipeByID = async (id) => {
  try {
    const res = await api.get(`/recipe/${id}`)

    return res.data
  } catch (error) {
    toast.error("Error getting recipe")
  }
}

export const addComments = async (id, addCommentToServer) => {
  console.log(addCommentToServer)
  try {
    const res = await api.post(`/recipe/${id}`, { addCommentToServer })
    return res.data
  } catch (error) {
    toast.error("Error posting comment")
  }
}

export const addRecipe = async (recipeDetails) => {
  console.log(recipeDetails)
  try {
    const res = await api.post(`/recipe/add/new`, { recipeDetails })
    return res.data
  } catch (error) {
    toast.error("Error uploading recipe")
  }
}

export const myRecipes = async () => {
  try {
    const res = await api.get(`/recipe/user/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }) 
    return res.data
  } catch (error) {
    toast.error('Error getting user recipes')
  }
}

export const toggleFav = async (id) => {
  console.log(id);
  try {
    const res = await api.post(
      `/toggleFav/${id}`,
      { id },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
    return res.data
  } catch (error) {
    toast.error("Something went wrong")
    
  }
}

export const validateString = (value) => {
  return value?.length < 3 || value === null
    ? "Must have at least five characters"
    : null
}
export const validateNumber = (value) => {
  return value === "" ? "Select one from list" : null
}

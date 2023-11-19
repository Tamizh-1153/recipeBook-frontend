import './App.css'
import Home from './pages/home/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from "./pages/ResetPassword"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RecipePage from './pages/recipePage/RecipePage'
import AddRecipe from './pages/addRecipe/AddRecipe'
import MyRecipes from './pages/myRecipes/MyRecipes'
import FavPage from './pages/favorites/FavPage'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/forgot_password" Component={ForgotPassword} />
          <Route path="/reset_password/:id/:token" Component={ResetPassword} />
          <Route path="/recipe/:id" Component={RecipePage} />
          <Route path="/add_recipe" Component={AddRecipe} />
          <Route path="/my_recipes" Component={MyRecipes} />
          <Route path="/my_favorites" Component={FavPage} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" />
    </>
  )
}

export default App

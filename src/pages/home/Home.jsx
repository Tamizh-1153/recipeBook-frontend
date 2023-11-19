import React from "react"
import "./home.css"
import Header from "../../components/header/Header"
import Banner from "../../components/banner/Banner"
import Recipes from "../../components/recipes/Recipes"
import RecipeCarousel from "../../components/carousel/RecipeCarousel"

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <RecipeCarousel />
      <Recipes />
    </>
  )
}

export default Home

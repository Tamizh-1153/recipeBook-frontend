import React, { useEffect, useState } from "react"
import useGetAllRecipes from "../../hooks/useGetAllRecipes"
import { Container, Loader } from "@mantine/core"
import "./recipes.css"
import RecipeCard from "../reccipeCard/RecipeCard"
import SearchBar from "../searchBar/SearchBar"
import { useSelector } from "react-redux"

const Recipes = () => {
  const { data, isError, isLoading } = useGetAllRecipes()
  const {user}=useSelector(store=>store.user)

  const [filter, setFilter] = useState("")
  const visible=true

  useEffect(()=>{},[user?.favorites])

  if (isLoading) {
    return (
      <Container>
        <Loader
          style={{ width: "100%", justifyContent: "center" }}
          color="blue"
          size="xl"
          type="dots"
        />
      </Container>
    )
  }

  return (
    <div>
      <SearchBar filter={filter} setFilter={setFilter} />
      <div className="container recipes_container">
        {data
          ?.filter(
            (recipe) =>
              recipe.name.toLowerCase().includes(filter.toLowerCase()) ||
              recipe.cuisine.toLowerCase().includes(filter.toLowerCase()) ||
              recipe.recipeBy.toLowerCase().includes(filter.toLowerCase())
          )
          .map((recipe, i) => (
            <RecipeCard visible={visible} key={i} recipe={recipe} />
          ))}
      </div>
    </div>
  )
}

export default Recipes

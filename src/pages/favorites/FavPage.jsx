import React, { useEffect } from "react"
import Header from "../../components/header/Header"
import { useQuery } from "@tanstack/react-query"
import { myRecipes } from "../../api/posts"
import { Container, Loader } from "@mantine/core"
import RecipeCard from "../../components/reccipeCard/RecipeCard"
import { useSelector } from "react-redux"
import useUserDetails from "../../hooks/useUserDetails"
import useGetAllRecipes from "../../hooks/useGetAllRecipes"

const FavPage = () => {
 
  useGetAllRecipes()
  const visible=false
  const { user } = useSelector((store) => store.user)
  const { recipes } = useSelector((store) => store.recipes)
  var favRecipesData = []

  useEffect(() => {}, [user?.favorites])

  recipes?.map((recipe) => {
    if (user?.favorites.includes(recipe?._id)) {
      favRecipesData.push(recipe)
    }
  })

  return (
    <>
      <Header />
      {!user && !recipes ? (
        <Container>
          <Loader
            mt={"10rem"}
            style={{ width: "100%", justifyContent: "center" }}
            color="blue"
            size="xl"
            type="dots"
          />
        </Container>
      ) : (
        <div className="container recipes_container">
          {favRecipesData?.map((recipe, i) => (
            <RecipeCard visible={visible} key={i} recipe={recipe} />
          ))}
        </div>
      )}
    </>
  )
}

export default FavPage

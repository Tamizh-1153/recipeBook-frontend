import React, { useEffect } from "react"
import Header from "../../components/header/Header"
import { useQuery } from "@tanstack/react-query"
import { myRecipes } from "../../api/posts"
import { Center, Container, Loader } from "@mantine/core"
import RecipeCard from "../../components/reccipeCard/RecipeCard"
import { useSelector } from "react-redux"

import useGetAllRecipes from "../../hooks/useGetAllRecipes"
import useFavorites from "../../hooks/useFavorites"

const FavPage = () => {
  useGetAllRecipes()
  const { data, isLoading, isError } = useFavorites()
  const visible = false
  const { user } = useSelector((store) => store.user)
  const { recipes } = useSelector((store) => store.recipes)
  var favRecipesData = []

  useEffect(() => {}, [user?.favorites])

  if (isLoading) {
    return (
      <Container>
        <Center h={400}>
          <Loader size="lg" type="dots" />
        </Center>
      </Container>
    )
  }

  if (!isLoading && !isError) {
    var { favorites } = data
  }

  recipes?.map((recipe) => {
    if (favorites?.includes(recipe?._id)) {
      favRecipesData.push(recipe)
    }
  })


  return (
    <>
      <Header />
      {!recipes ? (
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
          {favRecipesData?.length !== 0 ? (
            favRecipesData?.map((recipe, i) => (
              <RecipeCard visible={visible} key={i} recipe={recipe} />
            ))
          ) : (
            <span style={{ marginTop: "2rem" }} className="font_Size">
              No fav recipes. Add fav recipes to view
            </span>
          )}
        </div>
      )}
    </>
  )
}

export default FavPage

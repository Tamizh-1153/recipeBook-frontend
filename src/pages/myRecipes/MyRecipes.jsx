import React from "react"
import Header from "../../components/header/Header"
import { useQuery } from "@tanstack/react-query"
import { myRecipes } from "../../api/posts"
import { Container, Loader } from "@mantine/core"
import RecipeCard from "../../components/reccipeCard/RecipeCard"

const MyRecipes = () => {
  const visible = true
  const { data, isError, isLoading } = useQuery({
    queryKey: ["UserRecipes"],
    queryFn: myRecipes,
  })
  console.log(data)
  
  return (
    <>
      <Header />
      {isLoading ? (
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
          {data?.length !== 0 ? (
            data?.map((recipe, i) => (
              <RecipeCard visible={visible} key={i} recipe={recipe} />
            ))
          ) : (
            <span style={{marginTop:'2rem'}} className="font_Size">
              No recipe added. Add recipe to view
            </span>
          )}
        </div>
      )}
    </>
  )
}

export default MyRecipes

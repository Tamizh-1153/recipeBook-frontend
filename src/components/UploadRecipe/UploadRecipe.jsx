import { Box, Button, Flex, Group } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import React from "react"
import { addRecipe } from "../../api/posts"
import useGetAllRecipes from "../../hooks/useGetAllRecipes"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const UploadRecipe = ({
  setActiveStep,
  recipeDetails,
  setRecipeDetails,
  prevStep,
}) => {
  const { refetch } = useGetAllRecipes()
  const refresh = useNavigate()

  const { mutate, isLoading } = useMutation({
    mutationFn: () => addRecipe(recipeDetails),
    onSettled: () => {
      toast.success("Recipe added successfully", { position: "top-right" })
      setRecipeDetails({
        name: "",
        prepTime: "",
        cookTime: "",
        serves: "",
        difficulty: "",
        cuisine: "",
        recipeBy: "",
        ingredients: [],
        directions: [],
        image: "",
        addedBy: "",
      })
      setActiveStep(0)
      refetch()
      window.location.href='/'
    },
  })

  return (
    <Box>
      <Flex mt={"2rem"} direction={"column"} justify={"center"}>
        <img className="rp_image" src={recipeDetails.image} alt="loading" />
        <Flex mt={"2rem"} direction={"column"}>
          <span className="font_Size">Name: {recipeDetails.name}</span>
          <span className="font_Size">
            Preparation time: {recipeDetails.prepTime}
          </span>
          <span className="font_Size">
            Cooking time: {recipeDetails.cookTime}
          </span>
          <span className="font_Size">Serves: {recipeDetails.serves}</span>
          <span className="font_Size">
            Difficulty: {recipeDetails.difficulty}
          </span>
          <span className="font_Size">Cuisine: {recipeDetails.cuisine}</span>
          <span className="font_Size">Recipe by: {recipeDetails.recipeBy}</span>
          <span className="font_Size">
            Ingredients: {recipeDetails.ingredients.join(",")}
          </span>
          <span className="font_Size">
            Directions: {recipeDetails.directions.join(",")}
          </span>
        </Flex>
        <Group mt={'1.5rem'} pb={'3rem'} justify="center">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button
            variant="default"
            disabled={isLoading}
            onClick={() => mutate()}
          >
            {isLoading ? "Uploading" : "Upload Recipe"}
          </Button>
        </Group>
      </Flex>
    </Box>
  )
}

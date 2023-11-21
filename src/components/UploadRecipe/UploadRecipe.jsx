import { Box, Button, Flex, Group, Text } from "@mantine/core"
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
      refetch()
      setActiveStep(0)
      refresh("/")
    },
  })

  return (
    <Box>
      <Flex mt={"2rem"} direction={"column"} justify={"center"}>
        <img className="rp_image" src={recipeDetails.image} alt="loading" />
        <Flex mt={"2rem"} direction={"column"}>
          <Group p={".3rem"}>
            <span className="font_Size">
              <strong>Name: </strong>
              {recipeDetails.name}
            </span>
          </Group>
          <Group p={".3rem"}>
            <span className="font_Size">
              <strong>Preparation time: </strong>
              {recipeDetails.prepTime}
            </span>
          </Group>
          <Group p={".3rem"}>
            <span className="font_Size">
              <strong>Cooking time: </strong>
              {recipeDetails.cookTime}
            </span>
          </Group>
          <Group p={".3rem"}>
            <span className="font_Size">
              <strong>Serves: </strong>
              {recipeDetails.serves}
            </span>
          </Group>
          <Group p={".3rem"}>
            <span className="font_Size">
              <strong>Difficulty: </strong>
              {recipeDetails.difficulty}
            </span>
          </Group>
          <Group p={".3rem"}>
            <span className="font_Size">
              <strong>Cuisine: </strong>
              {recipeDetails.cuisine}
            </span>
          </Group>
          <Group p={".3rem"}>
            <span className="font_Size">
              <strong>Recipe by: </strong>
              {recipeDetails.recipeBy}
            </span>
          </Group>
          <Group p={".3rem"}>
            <span className="font_Size">
              <strong>Ingredients: </strong>
              {recipeDetails.ingredients.join(",")}
            </span>
          </Group>
          <Group p={".3rem"}>
            <span className="font_Size">
              <strong>Directions: </strong>
              {recipeDetails.directions.join(",")}
            </span>
          </Group>
        </Flex>
        <Group mt={"1.5rem"} pb={"3rem"} justify="center">
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

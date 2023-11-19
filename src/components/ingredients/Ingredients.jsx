import { Box, Button, Group, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import React from "react"

const Ingredients = ({
  recipeDetails,
  setRecipeDetails,
  nextStep,
  prevStep,
}) => {
  const form = useForm({
    initialValues: {
      ingredientsData: recipeDetails.ingredients,
      directionsData: recipeDetails.directions,
    },
    validate: {
      ingredientsData: (value) =>
        value?.length < 20 || value === null
          ? "Must be more than 20 characters"
          : null,
      directionsData: (value) =>
        value?.length < 20 || value === null
          ? "Must be more than 20 characters"
          : null,
    },
  })

  const { ingredientsData, directionsData } = form.values

  const handleSubmit = () => {
    const { hasErrors } = form.validate()

    if (!hasErrors) {
      const ingredients = ingredientsData?.split(",")
      const directions = directionsData?.split(",")
      setRecipeDetails((prev) => ({
        ...prev,
        ingredients: ingredients,
        directions: directions,
      }))
      nextStep()
    }
  }

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <Textarea
          label="Ingredients"
          withAsterisk
          {...form.getInputProps("ingredientsData")}
          placeholder="Add ingredients separated by comma(,)"
        />
        <Textarea
          label="Directions"
          withAsterisk
          {...form.getInputProps("directionsData")}
          placeholder="Add directions separated by comma(,)"
        />

        <Group justify="center" position="center" mt={"xl"}>
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button variant="default" type="submit">
            Next
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default Ingredients

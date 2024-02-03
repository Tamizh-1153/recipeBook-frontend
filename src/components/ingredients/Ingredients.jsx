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
      ingredients: recipeDetails?.ingredients,
      directions: recipeDetails?.directions,
    },
    validate: {
      ingredients: (value) =>
        value?.length < 20 || value === null
          ? "Must be more than 20 characters"
          : null,
      directions: (value) =>
        value?.length < 20 || value === null
          ? "Must be more than 20 characters"
          : null,
    },
  })

  const { ingredients, directions } = form.values

  const handleSubmit = () => {
    const { hasErrors } = form.validate()

    if (!hasErrors) {
      setRecipeDetails((prev) => ({
        ...prev,
        ingredients: ingredients?.split(","),
        directions: directions?.split(","),
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
          autosize
          minRows={4}
          label="Ingredients"
          withAsterisk
          {...form.getInputProps("ingredients")}
          placeholder="Add ingredients separated by comma(,)"
        />
        <Textarea
          autosize
          minRows={4}
          label="Directions"
          withAsterisk
          {...form.getInputProps("directions")}
          placeholder="Add directions separated by comma(,)"
        />

        <Group pb={"2rem"} justify="center" position="center" mt={"xl"}>
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

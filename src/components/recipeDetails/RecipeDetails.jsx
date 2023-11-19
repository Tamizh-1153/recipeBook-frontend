import { useForm } from "@mantine/form"
import React from "react"
import { validateNumber, validateString } from "../../api/posts"
import { Box, Button, Group, Select, TextInput } from "@mantine/core"

const RecipeDetails = ({ user, recipeDetails, setRecipeDetails, nextStep }) => {
  const form = useForm({
    initialValues: {
      name: recipeDetails?.name,
      prepTime: recipeDetails?.prepTime,
      cookTime: recipeDetails?.cookTime,
      serves: recipeDetails?.serves,
      difficulty: recipeDetails?.difficulty,
      cuisine: recipeDetails?.cuisine,
      recipeBy: recipeDetails?.recipeBy,
    },
    validate: {
      name: (value) => validateString(value),
      prepTime: (value) => validateString(value),
      cookTime: (value) => validateString(value),
      serves: (value) => validateNumber(value),
      difficulty: (value) => validateString(value),
      cuisine: (value) => validateString(value),
      recipeBy: (value) => validateString(value),
    },
  })

  const { name, prepTime, cookTime, serves, difficulty, cuisine, recipeBy } =
    form.values

  const handleSubmit = () => {
    const { hasErrors } = form.validate()
    if (!hasErrors) {
      setRecipeDetails((prev) => ({
        ...prev,
        name,
        prepTime,
        cookTime,
        serves,
        difficulty,
        cuisine,
        recipeBy,
        addedBy: user?.email,
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
        <TextInput
          withAsterisk
          label="Recipe name"
          placeholder="Enter recipe name"
          {...form.getInputProps("name")}
        />

        <TextInput
          withAsterisk
          label="Preparation time"
          placeholder="Ex: 10 min"
          {...form.getInputProps("prepTime")}
        />

        <TextInput
          withAsterisk
          label="Cooking time"
          placeholder="Ex: 10 min"
          {...form.getInputProps("cookTime")}
        />

        <Select
          withAsterisk
          label="Serves"
          placeholder="Select"
          data={[2, 4, 6]}
          defaultValue={1}
          {...form.getInputProps("serves")}
        />

        <Select
          withAsterisk
          label="Difficulty"
          placeholder="Select"
          data={["Easy", "Moderate", "Hard"]}
          {...form.getInputProps("difficulty")}
        />

        <Select
          withAsterisk
          label="Cuisine"
          placeholder="Select"
          data={["Indian", "Continental", "Chinese", "Thai", "Mexican"]}
          {...form.getInputProps("cuisine")}
        />

        <TextInput
          withAsterisk
          label="Recipe by"
          placeholder="Ex: Chef John "
          {...form.getInputProps("recipeBy")}
        />

        <Group justify="center" mt={"xl"}>
          <Button variant="default" type="submit">
            Next
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default RecipeDetails

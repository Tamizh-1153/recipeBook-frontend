import { useSelector } from "react-redux"
import Header from "../../components/header/Header"
import "./addRecipe.css"
import {
  Button,
  Center,
  Container,
  Group,
  Loader,
  Stepper,
} from "@mantine/core"
import useUserDetails from "../../hooks/useUserDetails"
import { useState } from "react"
import RecipeDetails from "../../components/recipeDetails/RecipeDetails"
import UploadImage from "../../components/uploadImage/UploadImage"
import Ingredients from "../../components/ingredients/Ingredients"
import { UploadRecipe } from "../../components/UploadRecipe/UploadRecipe"

const AddRecipe = () => {
  useUserDetails()
  const { user } = useSelector((store) => store.user)

  const [active, setActive] = useState(0)
  const [recipeDetails, setRecipeDetails] = useState({
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

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current))
  }

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current))
  }

  if (!user) {
    return (
      <Container>
        <Loader
          mt={"10rem"}
          style={{ width: "100%", justifyContent: "center" }}
          color="blue"
          size="xl"
          type="dots"
        />
      </Container>
    )
  }

  return (
    <>
      <Header />
      <div className="container">
        <Stepper
          orientation={window.innerWidth < 640 ? "vertical" : "horizontal"}
          active={active}
          onStepClick={setActive}
          size="sm"
          allowNextStepsSelect={false}
          mt={"1.5rem"}
        >
          <Stepper.Step label="Recipe Details">
            <RecipeDetails
              user={user}
              nextStep={nextStep}
              recipeDetails={recipeDetails}
              setRecipeDetails={setRecipeDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Recipe Image">
            <UploadImage
              prevStep={prevStep}
              nextStep={nextStep}
              recipeDetails={recipeDetails}
              setRecipeDetails={setRecipeDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Ingredients & Directions">
            <Ingredients
              prevStep={prevStep}
              nextStep={nextStep}
              recipeDetails={recipeDetails}
              setRecipeDetails={setRecipeDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Preview">
            <UploadRecipe
              prevStep={prevStep}
              setActiveStep={setActive}
              recipeDetails={recipeDetails}
              setRecipeDetails={setRecipeDetails}
            />
          </Stepper.Step>
        </Stepper>
      </div>
    </>
  )
}

export default AddRecipe

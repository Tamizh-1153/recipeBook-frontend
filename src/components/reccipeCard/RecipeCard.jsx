import { truncate } from "lodash"
import "./recipeCard.css"
import { useNavigate } from "react-router-dom"
import Heart from "../heart/Heart"
import { useSelector } from "react-redux"

const RecipeCard = ({ recipe,visible }) => {
  const refresh = useNavigate()
  const { user } = useSelector((store) => store.user)

  return (
    <div
    style={{cursor:'pointer'}}
      onClick={() => refresh(`/recipe/${recipe._id}`)}
      className="recipe_card"
    >
      {visible && user ? <Heart user={user} id={recipe?._id} /> : null}
      
      <img src={recipe.image} alt="" />
      <p>{truncate(recipe.name, { length: 22 })}</p>
      <span>
        by <em>{recipe.recipeBy}</em>
      </span>
    </div>
  )
}

export default RecipeCard

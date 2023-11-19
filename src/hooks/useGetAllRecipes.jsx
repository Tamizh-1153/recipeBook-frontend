import { useQuery } from "@tanstack/react-query"
import { getAllRecipes } from "../api/posts"
import { useDispatch } from "react-redux"
import { addRecipes } from "../features/recipes/recipesSlice"

const useGetAllRecipes = () => {
  const dispatch= useDispatch()
  const { data, isError, isLoading,refetch } = useQuery({
    queryKey: ["recipes"],
    queryFn: getAllRecipes,
  })
  if(!isError && !isLoading) {
    dispatch(addRecipes(data))
  }


  return {
    data,
    isError,
    isLoading,
    refetch
  }
}

export default useGetAllRecipes

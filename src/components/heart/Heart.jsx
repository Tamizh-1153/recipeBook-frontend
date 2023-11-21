import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { AiFillHeart } from "react-icons/ai"
import { toggleFav } from "../../api/posts"
import useFavorites from "../../hooks/useFavorites"

const Heart = ({ user, id }) => {
  const [heartColor, setHeartColor] = useState("#0000003c")
  const queryClient = useQueryClient()
  const { data, isLoading, isError, refetch } = useFavorites()
  if (!isLoading && !isError) {
    var { favorites } = data
  }

  useEffect(() => {
    setHeartColor(() => checkFav(id, favorites))
  }, [favorites])

  const checkFav = (id, favorites) => {
    return favorites?.includes(id) ? "#fb6b83" : "#0000003c"
  }

  const { mutate } = useMutation({
    mutationFn: () => toggleFav(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fav"] })
      refetch()
  
    },
  })

  const handleLike = () => {
    mutate()
    setHeartColor((prev) => (prev === "#fb6b83" ? "#0000003c" : "#fb6b83"))
  }

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation()
        handleLike()
      }}
    />
  )
}

export default Heart

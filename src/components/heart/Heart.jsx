import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { AiFillHeart } from "react-icons/ai"
import useUserDetails from "../../hooks/useUserDetails"
import { toggleFav } from "../../api/posts"

const Heart = ({ user, id }) => {
  const [heartColor, setHeartColor] = useState("#0000003c")
  const { refetch } = useUserDetails()
  const { favorites } = user

  useEffect(() => {
    setHeartColor(() => checkFav(id, favorites))
  }, [favorites])

  //console.log(favorites)

  const checkFav = (id, favorites) => {
    return favorites?.includes(id) ? "#fb6b83" : "#0000003c"
  }

  const { mutate } = useMutation({
    mutationFn: () => toggleFav(id),
    onSuccess: () => {
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

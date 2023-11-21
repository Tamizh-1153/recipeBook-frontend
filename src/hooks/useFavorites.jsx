import { useQuery } from "@tanstack/react-query"
import { getFavorites } from "../api/posts"

const useFavorites = () => {

    const {data,isLoading,isError,refetch} = useQuery({
        queryKey:['fav'],
        queryFn:getFavorites
    })

  return {data,isLoading,isError,refetch}
}

export default useFavorites

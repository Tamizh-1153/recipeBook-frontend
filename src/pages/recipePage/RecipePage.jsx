import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getRecipeByID } from "../../api/posts"
import { Center, Container, Flex, Group, Image, Loader } from "@mantine/core"
import Header from "../../components/header/Header"
import "./recipePage.css"
import Comments from "../../components/comments/Comments"
import Heart from "../../components/heart/Heart"
import useUserDetails from "../../hooks/useUserDetails"
import { useSelector } from "react-redux"
import ShareButtons from "../../components/shareButtons/ShareButtons"

const RecipePage = () => {
  const { user } = useSelector((store) => store.user)
  const { id } = useParams()
  const { data, isError, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeByID(id),
  })
  const url = window.location.href

  if (isLoading) {
    return (
      <Container>
        <Center h={400}>
          <Loader size="lg" type="dots" />
        </Center>
      </Container>
    )
  }

  return (
    <>
      <Header />
      <div className="container rp_container">
        <Group mb={'1rem'} justify="center" className="font_Size">
          {data?.name} {user ? <Heart  user={user} id={id} /> : null}
        </Group>
        <img className="rp_image" src={data?.image} alt="" />

        <div className="time_container">
          <Group justify="center">
            <span>Prep: {data?.prepTime}</span>
            <span>Cook: {data?.cookTime}</span>
            <span>Serves: {data?.serves}</span>
          </Group>
        </div>

        <Flex className="basic_info_container" justify="space-between">
          <Flex direction="column">
            <span className="font_Size">
              Difficulty: <em>{data?.difficulty}</em>
            </span>
            <span className="font_Size">
              Cuisine: <em>{data?.cuisine}</em>
            </span>
          </Flex>
          <Flex direction="column">
            <span className="font_Size">Recipe by</span>
            <span className="font_Size">
              <em>{data?.recipeBy}</em>
            </span>
          </Flex>
        </Flex>

        <Group mt={'1.5rem'} justify="center">
          <ShareButtons url={url} title={data?.name} />
        </Group>

        <Flex direction={"column"} mt={"2rem"}>
          <h3>Ingredients</h3>
          {data?.ingredients.map((item, i) => (
            <Flex key={i} gap={".5rem"} mb={".7rem"}>
              <span>- </span>
              <span className="font_Size">{item}</span>
            </Flex>
          ))}
        </Flex>

        <Flex direction={"column"} mt={"2rem"}>
          <h3>Directions</h3>
          {data?.directions.map((item, i) => (
            <Flex key={i} gap={".5rem"} mb={".7rem"}>
              <span>- </span>
              <span style={{ textWrap: "wrap" }} className="font_Size">
                {item}
              </span>
            </Flex>
          ))}
        </Flex>

        {/* Comments */}
        <Comments id={id} comments={data?.comments} />
      </div>
    </>
  )
}

export default RecipePage

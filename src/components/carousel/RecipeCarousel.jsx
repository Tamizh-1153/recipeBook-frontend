import { Carousel, CarouselSlide } from "@mantine/carousel"
import useGetAllRecipes from "../../hooks/useGetAllRecipes"
import "./recipeCarousel.css"
import { Tooltip } from "@mantine/core"

const RecipeCarousel = () => {
  const { data, isError, isLoading } = useGetAllRecipes()

  const filteredData = data?.slice(5, 12)

  return (
    <div className="container carousel_container">
      <p>TOP PICKS</p>
      <Carousel
        withIndicators
        height={200}
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        slideGap={{ base: 0, sm: "md" }}
        loop
        align="start"
      >
        {filteredData?.map((recipe, i) => (
          <CarouselSlide
            onClick={() => (window.location.href = `/recipe/${recipe._id}`)}
            key={i}
          >
            <Tooltip withArrow label={recipe.name}>
              <img
                style={{
                  width: "22rem",
                  height: "12rem",
                  objectFit: "cover",
                  borderRadius: "10px",
                  margin: "auto",
                }}
                src={recipe.image}
                alt="err loading"
              />
            </Tooltip>
          </CarouselSlide>
        ))}
        {/* <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide> */}
        {/* ...other slides */}
      </Carousel>
    </div>
  )
}

export default RecipeCarousel

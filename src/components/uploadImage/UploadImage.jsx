import { Button, Center, Flex, Group } from "@mantine/core"
import { IconCloudUpload } from "@tabler/icons-react"
import React, { useEffect, useRef, useState } from "react"

const UploadImage = ({
  recipeDetails,
  setRecipeDetails,
  nextStep,
  prevStep,
}) => {
  const [imageURL, setImageURL] = useState("")
  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dytqxtsrc",
        uploadPreset: "ahoqfuhl",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURL(result.info.secure_url)
        }
      }
    )
  }, [])

  const handleNext = () => {
    setRecipeDetails((prev) => ({ ...prev, image: imageURL }))
    console.log(recipeDetails);
    nextStep()
  }

  return (
    <div>
      {!imageURL ? (
        <Flex
          mt={"2rem"}
          style={{ cursor: "pointer" }}
          align={"center"}
          direction={"column"}
          onClick={() => widgetRef.current?.open()}
        >
          <IconCloudUpload size={50} color="gray" />
          <span>Upload Image</span>
        </Flex>
      ) : (
        <div onClick={() => widgetRef.current?.open()}>
          <img className="rp_image" src={imageURL} alt="recipe" />
        </div>
      )}

      <Group justify="center" position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button
          // className="comment_submit"
          onClick={handleNext}
          disabled={!imageURL}
          variant="default"
        >
          Next
        </Button>
      </Group>
    </div>
  )
}

export default UploadImage

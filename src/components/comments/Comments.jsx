import { Avatar, Button, Flex, Group, Input } from "@mantine/core"
import { useSelector } from "react-redux"
import "./comments.css"
import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addComments } from "../../api/posts"
import { useNavigate } from "react-router-dom"

const Comments = ({ id, comments }) => {
  const queryClient = useQueryClient()
  const [addComment, setAddComment] = useState("")
  const refresh=useNavigate()

  const [addCommentToServer, setAddCommentToServer] = useState({})
  const { user } = useSelector((store) => store.user)

  useEffect(() => {}, [comments])

  const { mutate } = useMutation({
    mutationFn: () => addComments(id, addCommentToServer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipe", id] })
    },
  })

  const handleChange = (e) => {
    setAddComment(e.target.value)
  }

  const handleSubmit = () => {
    console.log(addComment)
    setAddCommentToServer({
      name: user?.name,
      comment: addComment,
    })
    mutate(addCommentToServer)
  }

  return (
    <Flex mt={"1.5rem"} direction={"column"} pb={"3rem"}>
      <h3>Comments</h3>
      {comments?.length === 0 ? (
        <span>No comments yet...</span>
      ) : (
        comments.map((comment, i) => (
          <Flex mt={"1rem"} key={i} align={"start"} gap={"1rem"}>
            <Avatar className="comment_avatar" color="cyan">
              {comment.name.charAt(0)}
            </Avatar>
            <Flex className="comment_text" direction={"column"}>
              <span className="font_Size">{comment.name}</span>
              <span className="font_Size">{comment.comment}</span>
            </Flex>
          </Flex>
        ))
      )}
      {!user ? (
        <Group justify="center">
          <Button onClick={()=>refresh('/login')} className="comment_submit">Log in to comment</Button>
        </Group>
      ) : (
        <Group mt={"1.5rem"}>
          <Input
            radius={"lg"}
            value={addComment}
            onChange={handleChange}
            className="comment_input"
            placeholder="Post your comments..."
          />
          <Button
            onClick={handleSubmit}
            className="comment_submit"
            variant="filled"
          >
            Submit
          </Button>
        </Group>
      )}
    </Flex>
  )
}

export default Comments

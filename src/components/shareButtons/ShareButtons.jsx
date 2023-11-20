import React from "react"
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share"

const ShareButtons = ({ url }) => {
  return (
    <>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <TelegramShareButton url={url}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      
      <RedditShareButton url={url}>
        <RedditIcon size={32} round />
      </RedditShareButton>
    </>
  )
}

export default ShareButtons

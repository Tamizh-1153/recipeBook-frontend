import { Image } from '@mantine/core'
import bannerImg from '../../assets/banner.jpg'
import './banner.css'

const Banner = () => {
  return (
    <div className='container banner_container'>
        <Image className='banner_img' src={bannerImg} />
    </div>
  )
}

export default Banner
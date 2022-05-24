import React, { useState, useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade, Autoplay } from 'swiper'

import { FeaturedPostCard } from '../components'
import { getFeaturedPosts } from '../services'
import { GetFeaturedPosts } from '../interfaces'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
}

const breakpoints = {
  0: {
    // slidesPerView: 1,
  },
  640: {
    // slidesPerView: 2,
    spaceBetween: 20,
  },
  768: {
    // slidesPerView: 3,
    spaceBetween: 30,
  },
  1024: {
    // slidesPerView: 5,
    spaceBetween: 40,
  },
}

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState<GetFeaturedPosts['posts']>([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result)
      setDataLoaded(true)
    })
  }, [])

  return (
    <div className="mb-8">
      <div className=" mb-8 h-60 bg-gray-300 py-4 px-8">
        <Swiper
          modules={[EffectFade, Navigation, Autoplay]}
          effect='fade'
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{delay: 5000}}
          // navigation
					// breakpoints={breakpoints}
          
        >
          {dataLoaded && featuredPosts.map((post) => (
						<SwiperSlide> 
							<FeaturedPostCard key={post.title} post={post} />
						</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default FeaturedPosts

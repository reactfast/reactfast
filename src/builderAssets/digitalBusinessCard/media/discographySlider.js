'use client' // Ensure this component is client-side

import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SliderComponent = ({ releases }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    arrows: false,
  }

  return (
    <div className="mt-8 w-full p-4">
      <h2 className="text-center text-xl font-bold">Discography</h2>
      <Slider {...settings}>
        {releases.map((release, index) => (
          <div key={index} className="p-2">
            <div className="relative h-40 w-full bg-gray-200">
              <Image
                src={release.imageUrl}
                alt={release.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <p className="mt-2 text-center text-gray-600">{release.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SliderComponent

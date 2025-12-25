'use client'

import { useState } from 'react'
import Slider from 'react-slick'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { ProductCard } from './productCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const popularProducts = [
  { id: 1, name: 'Popular 1', price: '$50', imageUrl: '/images/popular1.jpg' },
  { id: 2, name: 'Popular 2', price: '$75', imageUrl: '/images/popular2.jpg' },
  { id: 3, name: 'Popular 3', price: '$100', imageUrl: '/images/popular3.jpg' },
  { id: 4, name: 'Popular 4', price: '$60', imageUrl: '/images/popular4.jpg' },
  { id: 5, name: 'Popular 5', price: '$80', imageUrl: '/images/popular5.jpg' },
  { id: 6, name: 'Popular 6', price: '$90', imageUrl: '/images/popular6.jpg' },
]

export default function PopularProducts() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of products visible at once
    slidesToScroll: 1,
    nextArrow: (
      <ChevronRightIcon className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 transform p-2 text-primary" />
    ),
    prevArrow: (
      <ChevronLeftIcon className="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 transform p-2 text-primary" />
    ),
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="mb-8 text-3xl font-bold text-primary">Popular Products</h2>
      <div className="relative">
        <Slider {...settings}>
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Slider>
      </div>
    </section>
  )
}

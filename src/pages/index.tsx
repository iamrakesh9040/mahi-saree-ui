import { BestSeller, HeroSection, NewArrival, PopularProducts, Testimonial, WatchBuy } from '@/Components/home'
import { PublicLayout } from '@/layouts'
import React from 'react'

const Home = () => {
  return (
    <PublicLayout>
      <HeroSection />
      <PopularProducts />
      <WatchBuy />
      <NewArrival />
      <BestSeller />
      <Testimonial />
    </PublicLayout>
  )
}

export default Home
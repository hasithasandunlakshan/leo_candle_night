"use client"
import  OrderForm  from '@/components/order/orderForm'

import Particles from '../../components/Particle'


import React from 'react'
import Footer from '@/components/footer/FooterPage'

export default function page() {
  return (
    <div className=' h-[100vh]  max-h-screen'>


        <OrderForm/>
     

  <Footer/>
    </div>
  )
}

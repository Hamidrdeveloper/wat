import React from 'react'
import Slider from '../../components/slider'

export default function WelcomeScreen({navigation}) {
  return (
    <>
    <Slider navigation={navigation} data={[1,2,3,4]}/>
    </>
  )
}

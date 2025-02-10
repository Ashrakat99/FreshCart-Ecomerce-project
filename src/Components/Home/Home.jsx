import React from 'react'
import style from './Home.module.css'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import RecentProducts from '../RecentProducts/RecentProducts';
import { useState } from 'react';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';


export default function Home() {


  return <>
      <MainSlider/>
      <CategoriesSlider/>
      <RecentProducts/>
    
  </>
}



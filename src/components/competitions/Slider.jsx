import React from 'react'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css"

import SlideItem from './SlideItem'

const Slider = ({sliderData}) => {  

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1024 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 1024, min: 720 },
          items: 2
        },
        tablet: {
          breakpoint: { max: 720, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };


    return (
        <div className='sliderContainer'> 
            <Carousel responsive={responsive} centerMode={true}>
            { 
                sliderData.map( (item) => {
                    return <SlideItem key={item.id} item={item}/>
                })     
             }
            </Carousel>
        </div>
        


        /** 
        <Carousel responsive={responsive}>
        { 
            sliderData.map( (item) => {
                return <SlideItem key={item.id} item={item}/>
            })     
        }
        </Carousel>*/
    )
}

export default Slider 
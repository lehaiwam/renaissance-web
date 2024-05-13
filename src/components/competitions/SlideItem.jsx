import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const SlideItem = ({item}) => {
    const navigate = useNavigate()

    const { description, imageUrl, name } = item;
    

    return (
        <div className='slideItem'>
            
            <p className='description'>{description}</p>

                <Link to='/competition/champion' state={{ item: item}}> 

                    <div className='image'>     
                        <img src={imageUrl} alt=''  />
                    </div>

                </Link>

        

            <p className='name'>{name}</p>
        </div>
    )
}

export default SlideItem
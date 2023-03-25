import React from 'react';
import { getDogDetail, resetDetail } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import style from "./detail.module.css"


const Detail = () => {
  let dispatch= useDispatch();
  let { id }= useParams();
  const dogDetail= useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(getDogDetail(id))
    return ()=> {
      dispatch(resetDetail())
    }
  }, [])

  return (

        <div className={style.swiperwrapper}>
          <figure className={style.swiperSlide}>
            <img src={dogDetail?.image ? dogDetail.image : "img"} alt="img"/>
            <figcaption className={style.swiperDescription}>
              <h2>{dogDetail?.name}</h2>
              <p>
                <h5>Id: {dogDetail?.id}</h5>
                <h5>Weight</h5>
                <h5>Min: {dogDetail?.weightMin} - Max: {dogDetail?.weightMax}</h5>
                <h5>Average weight: {dogDetail?.averageWeight}</h5> 
                <h5>Height (min - max): {dogDetail?.height}</h5>
                <h5>Life expectancy: {dogDetail?.life_span}</h5>    
                <h5>Temperament: {dogDetail?.temperament}</h5>
              </p>
            <Link to="/home">
                <button className={style.homeBut}>Home</button>
            </Link>
            </figcaption>
          </figure>
        </div>
  )
}

export default Detail;
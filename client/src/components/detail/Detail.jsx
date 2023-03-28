import React from 'react';
import { getDogDetail, resetDetail } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import style from "./detail.module.css"
import NotFound from '../not found/NotFound';
import Loader from '../home/loader/Loader';


const Detail = () => {
  let dispatch= useDispatch(); //this component will dispatch actions
  let { id }= useParams();
  const dogDetail= useSelector((state) => state.dogDetail); //global state

  const [load, setLoad]= useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 1000);
    dispatch(getDogDetail(id))
    return ()=> {
      dispatch(resetDetail()) //this action avoids saving the las visited detail so that when you see a new dogDetail you don´t see the previously seen dog
    }
  }, [dispatch])

  return (
          load ? (<Loader></Loader>) :
          !Object.keys(dogDetail).length ? (<NotFound></NotFound>) : (<div className={style.swiperwrapper}>
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
        </div>) 
  )
}

export default Detail;
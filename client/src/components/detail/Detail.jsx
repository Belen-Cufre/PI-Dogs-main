import React from 'react';
import axios from 'axios';
import { getDogDetail } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Dog from '../home/dog/Dog';
import { useParams } from 'react-router-dom';

const Detail = () => {
const dogDetail= useSelector(state => state.dogDetail);
let id= useParams();

useEffect(() => {
  getDogDetail(id)
}, [])


  return (
    
    <div>
      <h2>{dogDetail.id}</h2>
      <h3>{dogDetail.height}</h3>    
      <h3>{dogDetail.temperament}</h3>
    </div>

  )
}

export default Detail;
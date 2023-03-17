import React from 'react'

const Dog = ({image, name, temperament, weight}) => {
  return (
    <div>
      <img src={image} alt={name} width='200px' height='200px'/>
      <h2>{name}</h2>
      <h3>Temperament: {temperament}</h3>
      <h3>Weight: {weight}</h3>
    </div>
  )
}

export default Dog;
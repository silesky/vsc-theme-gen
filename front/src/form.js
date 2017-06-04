import React from 'react'

const Form = ({ label, color, handleChangeColor }) => {
  console.log('curentColor', color)
  return (
    <div>
      <form>
        <label>{label}</label>
        <input type="color" value={color} onChange={handleChangeColor} />
      </form>
    </div>
  )
}

export default Form

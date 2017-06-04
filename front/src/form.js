import React from 'react'

const Form = ({ label, color }) => {
  return (
    <div>
      <form>
        <label>{label}</label>
        <input type="color" value={color} />
      </form>
    </div>
  )
}

export default Form

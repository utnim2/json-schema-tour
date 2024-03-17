import React from 'react'
import Ajv2020 from "ajv/dist/2020"

const ajv = new Ajv2020()
const Step1 = () => {

  function validateSchema() {
    // const ajv = new Ajv()
    const schema = ""
    const validate = ajv.validateSchema(schema)
    console.log(validate)
  }
  validateSchema()
  return (
    <div>
      Hii
    </div>
  )
}

export default Step1

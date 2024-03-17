import { unregisterSchema, registerSchema, InvalidSchemaError, validate } from '@hyperjump/json-schema'
import React from 'react'

const Step2 = () => {

  async function validate2() {
    const schema = {
      "type": "array",
      "items": {"type": "number"}
    }
    try {
      unregisterSchema("https://json-schema.hyperjump.io/schema")
      registerSchema(schema, "https://json-schema.hyperjump.io/schema", "https://json-schema.org/draft/2020-12/schema")
      const output = await validate("https://json-schema.hyperjump.io/schema", schema)
      // console.log(output)
      if(schema.type = 'array' && schema.items && schema.items.type === 'number') {
        console.log("items of type number valid ✅", output)
      } else {
        console.log("items of type number not valid ❌", output)
      }

    } catch (err) {
      if(err instanceof InvalidSchemaError) {
        console.log("Schema validation failed: ", err.output)
      } else {
        console.log("An error occurred: ", err.message)
      }
    }
  }
  validate2()
  return (
    <div>
      Hii there
    </div>
  )
}

export default Step2

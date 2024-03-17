import React, { useState, useEffect } from "react";
import {
  validate,
  InvalidSchemaError,
  registerSchema,
  unregisterSchema,
  getMetaSchemaOutputFormat,
  getShouldValidateSchema,
} from "@hyperjump/json-schema/draft-2020-12";
import { DETAILED } from "@hyperjump/json-schema/experimental";
import "@hyperjump/json-schema/draft-2020-12";
import { TopBar } from "./TopBar";
getShouldValidateSchema;

const defaultSchemaVersion = "https://json-schema.org/draft/2020-12/schema";
const schemaUrl = "https://json-schema.hyperjump.io/schema";

export default function Editor() {
  const [schema, setSchema] = useState("");
  const [validationOutput, setValidationOutput] = useState();

  useEffect(() => {
    // Register the schema when the component mounts
    registerSchema(schema, schemaUrl, defaultSchemaVersion);

    // Cleanup function to unregister the schema when the component unmounts
    return () => {
      unregisterSchema(schemaUrl);
    };
  }, [schema]);

  const handleValidation = async () => {
    try {
      const output = await validate(schemaUrl, schema, DETAILED);
      getMetaSchemaOutputFormat(DETAILED);
      console.log(output);
      setValidationOutput(JSON.stringify(output, null, 2));
      // unregisterSchema(schemaUrl)
      if (output.valid) {
        console.log("Validation is success :-)", output);
      } else {
        console.log("Validation is not success :-(", output.errors);
      }
    } catch (err) {
      if (err instanceof InvalidSchemaError) {
        setValidationOutput(
          "Schema validation failed: " + JSON.stringify(err.output, null, 2)
        );
        console.log("Schema validation failed: ", err.output);
      } else {
        setValidationOutput("An error occurred: " + err.message);
        console.log(err.message);
      }
    }
  };

  const handleSchemaChange = (event) => {
    setSchema(event.target.value);
  };

  return (
    <div className="">
      <TopBar />
      <main
        key="1"
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4"
      >
        <header className="w-full max-w-3xl mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            JSON Schema Editor
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Edit your JSON Schema and validate it with a single click.
          </p>
        </header>
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
          <div>
            <label
              className="block text-gray-800 dark:text-gray-200 font-medium mb-2"
              htmlFor="schema-input"
            >
              JSON Schema
            </label>
            <Editor
              height="90vh"
              defaultLanguage="javascript"
              defaultValue="// Enter your json schema here "
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              onClick={handleValidation}
            >
              Validate Schema
            </button>
          </div>
          <div>
            <label
              className="block text-gray-800 dark:text-gray-200 font-medium mb-2"
              htmlFor="output-editor"
            >
              Validation Output
            </label>
            <textarea
              className="w-full h-40 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              id="output-editor"
              placeholder="Validation results will be displayed here..."
              readOnly
              value={validationOutput}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

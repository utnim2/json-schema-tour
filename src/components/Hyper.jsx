import React, { useState } from "react";
import {
  registerSchema,
  unregisterSchema,
  validate,
  InvalidSchemaError,
  setMetaSchemaOutputFormat,
} from "@hyperjump/json-schema/draft-2020-12";
import { BASIC } from "@hyperjump/json-schema/experimental";

import "@hyperjump/json-schema/draft-2020-12";
import Editor from "@monaco-editor/react";
import { TopBar } from "./TopBar";
import Confetti from "react-confetti";
import { toast } from "react-toastify";

let width = window.innerWidth;
let height = window.innerHeight;

function showErors(data) {
  for (const error of data) {
    const instanceLocation = error.instanceLocation;
    const keyword = error.keyword;
    const message = `"${instanceLocation}" fails schema constraint "${keyword}"`;
  }
  return message;
}
const Hyper = () => {
  const [schemas, setSchemas] = useState(null);
  // console.log(typeof schemas);
  const [validationOutput, setValidationOutput] = useState("");

  const defaultSchemaVersion = "https://json-schema.org/draft/2020-12/schema";
  const schemaUrl = "https://json-schema.hyperjump.io/schema";

  const handleSchemaChange = (newValue) => {
    try {
      const parsedSchema = JSON.parse(newValue);
      setSchemas(parsedSchema);
    } catch (error) {
      console.error("Invalid JSON schema:", error);
    }
  };

  setMetaSchemaOutputFormat(BASIC);

  const validateSchema = async () => {
    try {
      if (schemas) {
        unregisterSchema(schemaUrl);
        registerSchema(
          schemas,
          "https://json-schema.hyperjump.io/schema",
          defaultSchemaVersion
        );
        const output = await validate(schemaUrl, schemas, BASIC);
        console.log(output);
        if (output.valid) {
          // console.log("Validation is success :-)", output);
          setValidationOutput("Validation is success ✅");
          // setValidationOutput("")
        } else {
          // console.log("Validation is not success ❌", output.errors);
          setValidationOutput("Validation is not success ❌");
          toast.error("Validation is not success ❌");
        }
      } else {
        // console.log("No schema provided");
        setValidationOutput("No schema provided");
        toast.error("No schema provided");
      }
    } catch (err) {
      if (err instanceof InvalidSchemaError) {
        setValidationOutput(err);
        toast.error("Validation is not success ❌");
      } else {
        setValidationOutput(err);
        toast.error("Validation is not success ❌");
        // console.log("An error occurred: ", err);
      }
    }
  };

  return (
    <div className="">
      <Confetti
        recycle={false}
        numberOfPieces={
          validationOutput === "Validation is success ✅" ? 200 : 0
        }
        tweenDuration={1500}
        width={width}
        height={height}
      />
      <TopBar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black p-4">
        <header className="w-full max-w-3xl mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-slate-300 mb-2">
            JSON Schema Editor
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Edit your JSON Schema and validate it with a single click.
          </p>
        </header>

        <div className="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 space-y-6 ">
          <div>
            <label
              className="block text-gray-800 dark:text-gray-200 font-medium mb-2"
              htmlFor="schema-input"
            >
              JSON Schema
            </label>
            <Editor
              height="30vh"
              defaultLanguage="json"
              theme="vs-dark"
              defaultValue={schemas || ""}
              onChange={handleSchemaChange}
              className="rounded-lg border border-rounded border-slate-600"
              options={{
                minimap: { enabled: false },
                folding: true,
                wordWrap: "on",
              }}
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              onClick={validateSchema}
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
            <Editor
              height="30vh"
              defaultLanguage="markdown"
              theme="vs-dark"
              value={validationOutput}
              options={{
                minimap: { enabled: false },
                folding: true,
                wordWrap: "on",
                readOnly: true,
              }}
              className="rounded-lg border border-rounded border-slate-600"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hyper;

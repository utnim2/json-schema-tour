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
import Data from "./Data";
import { useNavigate, useParams } from "react-router-dom";

let width = window.innerWidth;
let height = window.innerHeight;

const Hyper2 = () => {
  const [schemas, setSchemas] = useState(null);
  const [validationOutput, setValidationOutput] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { step } = useParams();
  console.log(step)

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
          setValidationOutput("Validation is success ✅");
          toast.success("Proceed to next step");
          setValidated(true);
        } else {
          setValidationOutput("Validation is not success ❌");
          toast.error("Validation is not success ❌");
          setValidated(false);
        }
      } else {
        setValidationOutput("No schema provided");
        toast.error("No schema provided");
      }
    } catch (err) {
      if (err instanceof InvalidSchemaError) {
        setValidationOutput(err);
        toast.error("Validation is not success ❌");
        setValidated(false);
      } else {
        setValidationOutput(err);
        toast.error("Validation is not success ❌");
        setValidated(false);
      }
    }
  };

  const handleSteps = () => {
    if(validated) {
      navigate("/step-2")
    } else {
      toast.error("Please validate the schema first")
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
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-200 dark:from-black dark:to-gray-800 p-4 md:pl-40">
        {/* <header className="w-full max-w-5xl mb-8 pl-20">
        <div className="flex text-3xl font-bold text-gray-800 mb-2 dark:text-slate-200">Step 1 :<p className="dark:text-slate-400"> (Validate JSON Schema if it is valid for Draft 2020-12)</p> </div>
        </header> */}

        <div className="w-full max-w-5xl grid grid-cols-5 gap-12">
          <div className="bg-gray-900 text-white p-6 rounded-md col-span-2">
            <Data />
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-md col-span-3">
            <div className="text-md font-semibold mb-4 flex">
              JSON Schema
              <p className="text-sm dark:text-slate-400">
                (Enter your JSON Schema here...)
              </p>
            </div>
            <Editor
              height="50vh"
              defaultLanguage="json"
              theme="vs-dark"
              defaultValue={schemas || ""}
              onChange={handleSchemaChange}
              className="rounded-lg border border-rounded border-slate-600 mb-4"
              options={{
                minimap: { enabled: false },
                folding: true,
                wordWrap: "on",
              }}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={validateSchema}
              >
                Validate Schema
              </button>
            </div>
            <label
              className="block text-sm font-medium leading-none mt-4 mb-2"
              htmlFor="output-editor"
            >
              Validation Output
            </label>
            <Editor
              height="20vh"
              defaultLanguage="json"
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
            <div className="flex justify-end pt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSteps}
            >
              Step2
            </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hyper2;

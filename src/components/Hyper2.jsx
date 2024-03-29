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
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Data from "./Data";
import { formatErrorMessage } from "../../utils/errors";
import { useNavigate } from "react-router-dom";

const Hyper2 = () => {
  const [schemas, setSchemas] = useState(null);
  const [validationOutput, setValidationOutput] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const defaultSchemaVersion = "https://json-schema.org/draft/2020-12/schema";
  const schemaUrl = "https://json-schema.hyperjump.io/schema";

  const handleSchemaChange = (newValue) => {
    try {
      const parsedSchema = JSON.parse(newValue);
      setSchemas(parsedSchema);
      setValidationOutput("");
    } catch (error) {
      setValidationOutput("Invalid JSON schema. Please fix the errors and try again.");
      setSchemas(null);
    }
  };

  setMetaSchemaOutputFormat(BASIC);

  const validateSchema = async () => {
    try {
      if (schemas) {
        unregisterSchema(schemaUrl);
        registerSchema(
          schemas,
          schemaUrl,
          defaultSchemaVersion
        );
        const output = await validate(schemaUrl, schemas, BASIC);
        console.log(output);
        if (output.valid) {
          setValidationOutput("Validation is success ✅");
          toast.success("Procced to next step(click the step2 button in below)", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setValidated(true);
        } else {
          const errorMessage = formatErrorMessage(output);
          setValidationOutput(`Invalid\n${errorMessage}`);
          toast.error("Validation is not success ❌", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setValidated(false);
        }
      } else {
        setValidationOutput("No schema provided");
        toast.error("No schema provided", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      if (err instanceof InvalidSchemaError) {
        const errorMessage = formatErrorMessage(err.output);
        setValidationOutput(`Invalid\n${errorMessage}`);
        // console.log(err.output);
        // console.log(InvalidSchemaError);
        toast.error("Validation is not success ❌", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setValidated(false);
      } else {
        const errorMessage = formatErrorMessage(err);
        setValidationOutput(`Invalid\n${errorMessage}`);
        toast.error("Validation is not success ❌", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setValidated(false);
      }
    }
  };

  const handleSteps = () => {
    if(validated) {
      navigate("/step-2")
    } else {
      toast.error("Please validate the schema first", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
  };

  return (
    <div className="">
      <TopBar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-200 dark:from-black dark:to-gray-800 p-4 md:pl-40">

        <div className="w-full max-w-5xl grid grid-cols-5 gap-12">
          <div className="bg-gray-900 text-white p-6 rounded-md col-span-2">
            <Data id={1} />
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
                validate: true,
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
              theme="vs-dark"
              defaultLanguage="markdown"
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
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Hyper2;

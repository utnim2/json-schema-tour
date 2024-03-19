import React, { useState, useEffect } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierCaveDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import stepsData from "../../data/steps.json";

function Data({ id }) {
  const [step, setStep] = useState(null);

  useEffect(() => {
    const selectedStep = stepsData.steps.find((step) => step.id === id);
    setStep(selectedStep);
  }, [id]);

  const renderStepCard = () => {
    if (!step) return null;

    return (
      <div className="step-card bg-gray-100 rounded-lg shadow-md p-4 mb-4 dark:bg-slate-800">
        <h2 className="text-xl font-bold dark:text-slate-200">{step.description}</h2>
        <div className="testcases mt-4 dark:text-slate-300">
          <h3 className="text-lg font-medium dark:text-slate-400">Test Cases:</h3>
          <ul className="list-disc pl-4 dark:text-slate-400">
            {step.testcases.map((testcase) => (
              <li key={testcase.schema} className="mb-2">
                <p className="text-gray-400 dark:text-slate-400">Schema:</p>
                <SyntaxHighlighter language="json" style={atelierCaveDark} className="rounded overflow-auto bg-gray-200 p-2">
                  {JSON.stringify(testcase.schema, null, 2)}
                </SyntaxHighlighter>
                <p className="text-gray-400 mt-2">Expected Validation: {testcase.expectedValidation ? "Valid" : "Invalid"}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-2xl font-bold">{stepsData.title}</h1>
      <p className="text-gray-700 mb-8 dark:text-gray-400">{stepsData.description}</p>
      {renderStepCard()}
    </div>
  );
}

export default Data;
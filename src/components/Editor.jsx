
export default function Component() {
  return (
    <div className="flex justify-center py-10 bg-gray-800 min-h-screen">
      <div className="flex space-x-6">
        <div className="w-[350px] bg-gray-700 text-white">
          <div>
            <h3 className="text-lg font-semibold p-4">How to Validate</h3>
            <div className="p-4">
              <p className="mb-4">Follow these steps to validate your JSON Schema:</p>
              <ol className="list-decimal list-inside">
                <li>Enter your JSON Schema into the editor.</li>
                <li>Click the "Validate Schema" button.</li>
                <li>Review the validation output.</li>
                <li>Make any necessary changes to your schema and re-validate.</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="w-[600px] bg-gray-700 text-white">
          <div>
            <h3 className="text-lg font-semibold p-4">JSON Schema Editor</h3>
            <p className="p-4">Validate your JSON Schema if it is valid for Draft 2020-12</p>
          </div>
          <div className="flex flex-col space-y-4 p-4">
            <label className="block text-sm font-medium leading-none" htmlFor="json-schema">
              JSON Schema
            </label>
            <textarea
              className="h-40 bg-gray-600 text-white p-2"
              id="json-schema"
              placeholder="Enter your JSON Schema here..."
            />
            <button className="self-end bg-gray-900 text-white px-4 py-2 rounded-md">Validate Schema</button>
            <label className="block text-sm font-medium leading-none" htmlFor="validation-output">
              Validation Output
            </label>
            <textarea
              className="h-40 bg-gray-600 text-white p-2"
              id="validation-output"
              placeholder="Validation results will appear here..."
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  )
}


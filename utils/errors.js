export function formatErrorMessage (output) {
  const errorMessages = [];

  if (output.errors) {
    output.errors.forEach((error) => {
      const errorMessage = `* \`${error.instanceLocation}\` fails schema constraint \`${error.absoluteKeywordLocation}\``;
      errorMessages.push(errorMessage);
    });
  }

  return errorMessages.join('\n');
};
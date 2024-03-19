# JSON Schema Validator Project README

## Overview

Welcome to the JSON Schema Validator project! This README will guide you through the project's purpose, features, installation instructions, and usage guidelines.

### Purpose

The purpose of this project is to create a simple web application that allows users to validate JSON schemas against the JSON Schema Draft 2020-12 specification. The app will guide users through a multi-step validation process, providing a code editor for users to input their JSON schemas.

### Features

- Welcome page with a start button to initiate the validation process.
- Multi-step validation experience with step descriptions and test cases.
- Code editor for users to input their JSON schemas.
- Validation against JSON Schema Draft 2020-12 specification.
- Detailed error messages provided by `@hyperjump/json-schema` validator.
- Seamless transition between validation steps.

## Installation

Follow these steps to install and set up the app locally:

1. **Clone the Repository**: Clone this repository to your local machine using `git clone https://github.com/your-username/json-schema-validator.git`.
2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies using `npm install`.
3. **Start the App**: Once the dependencies are installed, you can start the app using `npm run dev`.

## Usage

To use the JSON Schema Validator app, follow these steps:

1. **Welcome Page**: Upon starting the app, you'll see a welcome page with a start button. Click the start button to begin the validation process.
2. **Step 1: Validate JSON Schema**: In this step, you'll be prompted to provide a JSON schema. Use the provided code editor to input your JSON schema. After submitting, the app will validate the schema against the JSON Schema Draft 2020-12 specification. If the schema is valid, proceed to the next step.
3. **Step 2: Validate Array Schema**: In this step, you'll be asked to provide a JSON schema that defines an array with items of type number. Again, use the code editor to input your schema. After submission, the app will validate the schema. If successful, you've completed the validation process.

## Technologies Used

- `@hyperjump/json-schema` for schema validation, providing extensive coverage and detailed error messages.
- `@monaco-editor/react` for the code editor component, offering a user-friendly interface for inputting JSON schemas.

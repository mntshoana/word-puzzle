# Generator by Word Gen

We are thrilled to introduce **Generator**, an innovative word puzzle application. Our enthusiasm for creating this app stems from our love for challenging and fun puzzles. **Generator** allows you to generate a random sequence of letters that can be rearranged to spell numbers from zero to ten. Additionally, it can analyze a given string to determine how many times each number (zero through ten) can be formed. Dive into the world of word puzzles and enhance your problem-solving skills with **Generator**!

Included, you may currently:

1. Generating a random sequence of letters that can be rearranged to spell the numbers zero through ten.
2. Solving a given string to find how many "zero", "one", "two", ..., "ten" can be formed from the sequence.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (which includes npm)
- [Git](https://git-scm.com/)

### Cloning the Repository

To clone the repository, run the following commands in your terminal:

```bash
git clone git@github.com:mntshoana/word-puzzle.git
cd word-app
```

### Installing Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

Note: this uses a proxied backend
Install for the proxy depencencies as well

```bash
cd proxy
npm install
cd ..
```

### Running the Application

To start the application, use the following command:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Note: this uses a proxied backend
Run the proxy

```bash
cd proxy
node ./proxy
```

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

This will launch the test runner in interactive watch mode.

### Building for Production

To create a production build, use the following command:

```bash
npm run build
```

This will create an optimized build of the app in the `build` folder.

### Additional Resources

For more information on how to work with React, check out the [React documentation](https://reactjs.org/).

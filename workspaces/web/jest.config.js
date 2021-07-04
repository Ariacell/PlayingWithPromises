module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ["<rootDir>/src"],
  
    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
  
    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    // setupFilesAfterEnv: [
    //   "@testing-library/react/cleanup-after-each",
    // ],

    transformIgnorePatterns: [
       "/node_modules/",
    ],
    
    moduleNameMapper: {
        "\\.(css|jpg|png|svg)$": "identity-obj-proxy"
    },
    
  
    // Test spec file resolution pattern
    // should contain `test` or `spec`.
    testRegex: 'src\/[^\.]*\.test.tsx',
  
    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
  };
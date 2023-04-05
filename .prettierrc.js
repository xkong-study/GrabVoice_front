module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine:"auto",
  overrides: [
    {
      "files": "*.js",
      "options": {
        "proseWrap": "never"
      }
    }
  ]
};

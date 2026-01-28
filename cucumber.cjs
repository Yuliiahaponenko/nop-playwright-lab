module.exports = {
  default: {
    requireModule: ['tsx/esm'],
    require: [
      'src/bdd/support/**/*.ts',
      'src/bdd/steps/**/*.ts'
    ],
    format: [
      'progress'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    // paths: only set when running "all" via npm run bdd; single-file runs pass path on CLI
    timeout: 120000
  }
};

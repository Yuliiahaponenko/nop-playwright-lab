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
    paths: ['src/bdd/features/**/*.feature'],
    timeout: 120000
  }
};

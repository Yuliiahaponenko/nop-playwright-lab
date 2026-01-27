module.exports = {
  default: {
    requireModule: ['tsx/esm'],
    require: ['bdd/step-definitions/**/*.ts'],
    format: [
      'progress-bar',
      'html:bdd/reports/cucumber-report.html',
      'json:bdd/reports/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    paths: ['bdd/**/*.feature']
  }
};

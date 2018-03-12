var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://qingtingtui.com/api"',
  // BASE_API: '"https://easy-mock.com/mock/59aa3432e0dc663341993f2f/qingtingtui"',
})

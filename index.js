function commandLinePlugin (optionDefinitions, options) {
  options = options || {}
  const commandLineArgs = require('command-line-args')
  const flatten = require('reduce-flatten')
  const cliOptions = commandLineArgs(optionDefinitions, { partial: true, argv: options.argv })
  const allDefinitions = Array
    .from(pluginOptionDefinitions(cliOptions, optionDefinitions))
    .reduce(flatten, [])
    .concat(optionDefinitions)
  return commandLineArgs(allDefinitions, options)
}

function * pluginOptionDefinitions (options, optionDefinitions) {
  const loadModule = require('load-module')
  const arrayify = require('array-back')
  for (const def of optionDefinitions) {
    if (def.plugin) {
      const pluginRequests = arrayify(options[def.name])
      const Plugins = pluginRequests.map(p => loadModule(p, { paths: '.' }))
      for (const Plugin of Plugins) {
        const plugin = new Plugin()
        yield plugin.optionDefinitions()
      }
    }
  }
}

module.exports = commandLinePlugin

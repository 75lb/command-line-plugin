const TestRunner = require('test-runner')
const commandLinePlugin = require('./')
const a = require('assert')

const runner = new TestRunner()

runner.test('simple', function () {
  const optionDefinitions = [
    { name: 'one' },
    { name: 'plugin', plugin: true }
  ]
  const argv = [ '--one', '1', '--plugin', 'fixture.js', '--two', '2' ]
  const { options, allOptionDefinitions } = commandLinePlugin(optionDefinitions, { argv })
  a.deepStrictEqual(options, {
    one: '1',
    plugin: 'fixture.js',
    two: '2'
  })
  a.deepStrictEqual(allOptionDefinitions, [
    { name: 'one' },
    { name: 'plugin', plugin: true },
    { name: 'two' }
  ])
})

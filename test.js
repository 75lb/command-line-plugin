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
  const result = commandLinePlugin(optionDefinitions, { argv })
  a.deepStrictEqual(result, {
    one: '1',
    plugin: 'fixture.js',
    two: '2'
  })
})

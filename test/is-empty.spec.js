const { assert } = require('chai');
const func = require('../utility/is-empty');

const data = {
  string: 'string',
  object: { key: 'value' },
  foo: undefined
}


describe('is-empty module', () => {
  describe('isEmpty()', () => {
    it('Should return the correct boolean', () => {
      let test = func.isEmpty(data.string)
      assert.isFalse(test, "string = 'string' should be false");
    })

    it('Should return the correct boolean', () => {
      let test = func.isEmpty(data.object)
      assert.isFalse(test, "object = {key: 'value'} should be false");
    })

    it('should return the correct boolean', () => {
      let test = func.isEmpty(data.foo)
      assert.isTrue(test, "foo = undefined should be true");
    })
  })
})
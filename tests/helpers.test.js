const helpers = require('../helpers')

describe('helpers', () => {
    describe('checkCommandAvaliable: (commandName)', () => {
        test('command not avaliable', () => {
            expect(jest.fn(() => helpers.checkCommandAvaliable('xxxx'))).toThrow()
        })

        test('command is avaliable', () => {
            expect(jest.fn(() => helpers.checkCommandAvaliable('cd'))).not.toThrow()
        })
    })
})

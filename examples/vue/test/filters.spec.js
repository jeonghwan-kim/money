import * as filters from '../src/filters'

describe('filters', ()=> {
  describe('currency()', () => {
    it('1000 to be "1,000"', () => {
      expect(filters.currency(1000)).toBe('1,000')
    })
    it('10000 to be "10,000"', () => {
      expect(filters.currency(10000)).toBe('10,000')
    })
    it('100 to be "100"', () => {
      expect(filters.currency(100)).toBe('100')
    })
    it('1000000 to be "1,000,000"', () => {
      expect(filters.currency(1000000)).toBe('1,000,000')
    })
  })
})

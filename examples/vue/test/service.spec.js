import * as service from '../src/service'

describe('service', () => {
  describe('query()', () => {
    it('Promise를 반환', () => {
      expect(service.query() instanceof Promise).toBe(true)
    })
    describe('Promise가 Fulfilled 되면', () => {
      let response;
      beforeEach(done => {
        service.query().then(res => {
          response = res
          done()
        })
      })
      it('배열을 반환', () => {
        expect(response instanceof Array).toBe(true)
      })
    })
  })
  describe('create()', () => {
    it('Promise를 반환', () => {
      const text = 'text1',
          amount = 1000

      expect(service.create({text, amount}) instanceof Promise).toBe(true)
    })
    describe('text파라매터가 없으면', () => {
      let res, err;
      beforeEach(done => {
        service.create({})
            .then(r => (res = r, done()))
            .catch(e => (err = e, done()))
      })
      it('Promise를 reject 한다', () => {
        expect(err instanceof Error).toBe(true)
        expect(res).toBe(undefined)
      })
    })
    describe('amount 파라매터가 없으면', () => {
      const text = 'text1'
      let res, err;
      beforeEach(done => {
        service.create({text})
            .then(r => (res = r, done()))
            .catch(e => (err = e, done()))
      })
      it('Promise를 reject 한다', () => {
        expect(err instanceof Error).toBe(true)
        expect(res).toBe(undefined)
      })
    })
    describe('리소스가 생성되면', () => {
      const text = 'text1',
          amount = 1000
      let res, err

      beforeEach(done => {
        service.create({text, amount})
            .then(r => (res = r, done()))
            .catch(e => (err = e, done()))
      })
      it('id값을 반환한다', () => {
        expect(res.hasOwnProperty('id')).toBe(true)
        expect(err).toBe(undefined)
      })
      it('date값을 반환한다', () => {
        expect(res.hasOwnProperty('date')).toBe(true)
        expect(err).toBe(undefined)
      })
    })
  })
})

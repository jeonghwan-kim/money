let data = [
  {id: 1, date: new Date(2017, 4, 1), text: '점심', amount: 7000},
  {id: 2, date: new Date(2017, 4, 1), text: '저녁', amount: 8000},
  {id: 3, date: new Date(2017, 4, 2), text: '아침', amount: 4000},
]
const delay = 400

export const query = () => {
  return new Promise(res => setTimeout(_=> res(data), delay))
}

export const create = (expense) => {
  const newExpense = Object.assign({}, expense, {
    id: data.reduce((maxId, item) => item.id > maxId ? item.id : maxId, 0) + 1,
  })

  newExpense.date = newExpense.date || new Date()
  data.push(newExpense)

  return new Promise(res => setTimeout(_=> res(newExpense), delay))
}

export const destroy = id => {
  data = data.filter(d => d.id !== id)
  return new Promise(res => setTimeout(_=> res(data), delay))
}

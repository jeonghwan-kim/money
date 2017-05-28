<template>
<div id="home">
  <h2>지출목록</h2>
  <ul>
    <li v-for="item in expenses">
      {{item.id}},
      {{item.date | date}},
      {{item.text}},
      {{item.amount | currency}}
    </li>
  </ul>
</div>
</template>

<script>
const expenses = [
  {id: 1, date: new Date(2017, 4, 1), text: '점심', amount: 7000},
  {id: 2, date: new Date(2017, 4, 1), text: '저녁', amount: 8000},
  {id: 3, date: new Date(2017, 4, 2), text: '아침', amount: 4000},
]
export default {
  name: 'home',
  data () {
    return {
      expenses,
      msg: 'ddd'
    }
  },
  filters: {
    date: d => {
      if (d && d instanceof Date)
        return d.toISOString().substring(0, 10);
    },
    currency: num => {
      return num
    }
  }
}
</script>

<style lang="scss">
</style>

<template>
<div id="home">
  <h2>지출목록</h2>
  <select v-model="selectedMonth" @change="onChangeMonth">
    <option v-for="month in monthList">{{month}}</option>
  </select>
  <p>총 지출: {{sum}}</p>
  <ul>
    <li v-for="item in expenses">
      {{item.date | date}},
      {{item.text}},
      {{item.amount | currency}}
      <button type="button" @click="onRemove(item.id)">X</button>
    </li>
  </ul>
</div>
</template>

<script>
import * as filters from './filters'
import * as service from './service'

export default {
  name: 'home',
  data () {
    return {
      selectedMonth: null,
      expenses: [],
      monthList: []
    }
  },
  created() {
    service.monthList().then(data => {
      this.monthList = data
      this.selectedMonth = this.monthList[0]
    }).then(_=> service.query(this.selectedMonth))
      .then(data => this.expenses = data)
  },
  computed: {
    sum() {
      return this.expenses.reduce((sum, item) => sum + item.amount, 0)
    }
  },
  filters,
  methods: {
    onRemove(id) {
      service.destroy(id).then(data => this.expenses = data)
    },
    onChangeMonth() {
      service.query(this.selectedMonth)
        .then(d => this.expenses = d)
    }
  },
}
</script>

<style lang="scss">
</style>

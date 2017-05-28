<template>
<div id="home">
  <h2>지출목록</h2>
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
import * as resource from './resource.service'

export default {
  name: 'home',
  data () {
    return {
      expenses: [],
    }
  },
  created() {
    resource.query().then(data => this.expenses = data)
  },
  computed: {
    sum() {
      return this.expenses.reduce((sum, item) => sum + item.amount, 0)
    }
  },
  filters,
  methods: {
    onRemove(id) {
      resource.destroy(id).then(data => this.expenses = data)
    }
  },
}
</script>

<style lang="scss">
</style>

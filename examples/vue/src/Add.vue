<template>
<div id="add">
  <h2>지출 입력</h2>
  <form @submit="onSubmit">
    <input type="text" v-model="text" />
    <input type="number" v-model="amount" />
    <input type="submit" value="추가" />
  </form>
</div>
</template>

<script>
import * as service from './service'

export default {
  name: 'add',
  data () {
    return {
      text: '',
      amount: 0
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      const userInput = this.validate()
      if (!userInput) return

      service.create(userInput).then(d => console.log(d))
      this.$router.push('/')
    },
    validate() {
      if (!this.text || !this.amount) return false

      return {
        text: this.text.trim(),
        amount: parseInt(this.amount, 10)
      }
    }
  }
}
</script>

<style lang="scss">
</style>

<template>
  <div class="example">{{ msg }}</div>
  <div class="example">{{ msg }}</div>
</template>

<script>
  export default {
    data :function() {
      return {
        msg: 'Hello xxxxxxx!'
      }
    }
  }
</script>

<style>
  .example {
    color: red;
  }
</style>
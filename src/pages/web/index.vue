<template>
  <div>
    <web-view :src="url"></web-view>

  </div>
</template>

<script>
  import {formatTime} from '@/utils/index'
  import card from '@/components/card'

  export default {
    components: {
    },

    data() {
      return {
        url: 'http://m.wufazhuce.com/movie/' + 1273
      }
    },
  }
</script>

<style>

</style>

<template>
  <div class="card-box" v-on:click="routerDetail(article)">
    <img class="card-background-image" v-bind:src="article.covers[0].originalUrl"
         v-if="article.templateType == 'image'"/>
    <text class="card-article-title">{{article.title}}</text>
    <div class="card-article-snippet">{{article.snippet}}</div>
    <div class="card-article-leftTime">{{leftTime}}</div>
  </div>
</template>

<script>
  export default {
    props: ['article'],

    data() {
      return {}
    }, mounted() {
      console.debug("------")
      console.debug(this.article)

    }, methods: {}

  }

</script>

<style>
  div {
    display: block;
  }


</style>

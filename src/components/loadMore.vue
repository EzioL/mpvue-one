<template>
  <!--<div>-->
    <!--<p class="card">-->
      <!--{{text}}-->
    <!--</p>-->
  <!--</div>-->


  <div class="load-more" >
    <p class="load-more-toast">  {{text}}</p>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
  .load-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5em;
    background: #fff;

  }

  .load-more-toast {
    font-size: 0.625em;
    color: #aaa;
  }
</style>

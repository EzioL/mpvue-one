<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="content">
    <img v-bind:src="plate.img_url" class="plate-img"/>
    <div class="plate-pic">{{plate.title}}|{{plate.pic_info}}</div>
    <div class="plate-forward">{{plate.forward}}</div>
    <div class="plate-pic">{{plate.words_info}}</div>

  </div>
</template>

<script>
export default {
  props: ['plate']
}
</script>

<style>
  .content{
    background-color: white;
    margin-bottom: 16px;
  }
  .plate-img{
    width: 100%;
  }
  .plate-pic{

    font-size: 12px;
    text-align: center;
    line-height: 20px;
    padding: 20px 0;
    color: rgba(0,0,0,0.6);
  }
  .plate-forward{
    line-height: 20px;
    padding: 0 15px;
    font-size: 16px;
  }


</style>

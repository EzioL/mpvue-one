<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="content">
        <loading v-show="isLoading">数据加载中</loading>
        <div v-show="!isLoading">
            <!--还缺个头 日期 天气-->

            <!--插画-->
            <plate :plate="plate"></plate>
            <!--折叠面板-->
            <div style="margin: 20px 0;">
                <div class="panel-head" v-on:click="panelShow = !panelShow">独唱团 {{plate.volume}}
                </div>
                <!--<div class="panel-head" v-show="panelShow"> 展开</div>-->
                <div class="panel-content" v-if="panelShow" v-for=" content in contentList">
                    <p>{{content.title}}</p>
                </div>

            </div>

        </div>

    </div>
</template>

<script>

    import plate from '@/components/plate'

    import request from '@/utils/request'


    export default {
        components: {
            plate
        },

        data () {
            return {
                isLoading: true,
                panelShow: false,
                weather: {},
                contentList: [],
                plate: {},
                menu: {}
            }
        },
        onLoad: function (options) {
            // 生命周期函数--监听页面加载
            this.getData();
        },
        methods: {
            getData: function () {
                let url = "http://v3.wufazhuce.com:8000/api/channel/one/0/%E4%B8%8A%E6%B5%B7%E5%B8%82";
                request.get(url).then(data => {
                    this.weather = data.data.weather;
                    this.menu = data.data.menu;
                    let list = data.data.content_list;
                    console.log("content_list", list)
                    for (let i = 0; i < list.length; i++) {
                        if (i === 0) {
                            this.plate = list[0];
                        } else {
                            this.contentList.push(list[i])
                        }
                    }

                    this.isLoading = false;
                });

            },
        }
    }
</script>

<style>
    .content {
        /*background-color: #eeeeee;*/
      background-color: red;
    }

    .panel-head {
        background-color: aquamarine;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        padding: 10px 0;
    }

    .panel-content {

        font-size: 16px;
        line-height: 20px;
        padding: 12px 0;
    }
</style>

<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="content">
        <loading v-show="isLoading">数据加载中</loading>

        <!--上拉刷新-->
        <!--<div class="load-more" v-show="isRefresh">-->
        <!--<p class="load-more-toast"> 上拉刷新...</p>-->
        <!--</div>-->
        <!--轮播图-->

        <swiper class="swiper" indicator-dots="true" autoplay="true" interval="3000" duration="500">
            <swiper-item v-for="(item, index) in banner">
                <img v-bind:src="item.cover" class="slide-image" mode="aspectFill"/>
            </swiper-item>
        </swiper>

        <!--专题列表-->
        <div class="topic-list">
            <block>
                <div class="topic" v-for="(topic, index) in topics"
                     v-on:click="routerTopicList(topic)">
                    <img v-bind:src="topic.cover" class="slide-image"/>
                    <p class="topic-title">{{topic.title}}</p>
                </div>
            </block>
        </div>


        <!--加载更多-->
        <div class="load-more" v-show="isLoadMore">
            <p class="load-more-toast"> 加载更多...</p>
        </div>
    </div>
</template>

<script>
    import {formatTime} from '@/utils/index'
    import loadMore from '@/components/loadMore'
    import request from '@/utils/request'
    import superbridge from '@/utils/superbridge'

    export default {
        components: {
            loadMore
        },

        data () {
            return {
                banner: [],
                topics: [],
                items: [],
                isRefresh: true,
                isLoading: false,
                isLoadMore: false
            }
        },
        created () {

        },
        mounted () {
            console.log("mounted")
            this.refresh()
        },
        onPullDownRefresh () {
            // 页面相关事件处理函数--监听用户下拉动作
            console.log("onPullDownRefresh")
            this.isLoading = true;
            this.refresh()
        },
        onReachBottom () {
            // 页面上拉触底事件的处理函数
            console.log("onReachBottom")
            this.isLoadMore = true;
            this.requestTopicData();
        },
        methods: {
            requestTopicData: function () {
                const url = 'http://v3.wufazhuce.com:8000/api/banner/list/4';
                let last_id = 0;
                if (this.topics.length != 0) {
                    last_id = this.topics[this.topics.length - 1].id
                }
                request.get(url + "?last_id=" + last_id).then(data => {
                    console.log("requestTopicData", data.data)
                    this.topics = this.topics.concat(data.data);
                    this.isLoadMore = false;
                })
            },
            requestBannerData: function () {
                const url = 'http://v3.wufazhuce.com:8000/api/banner/list/3';
                request.get(url).then(data => {
                    console.log("requestBannerData", data.data)
                    this.banner = data.data;
                })
            },
            async refresh () {
                await Promise.all([
                    this.requestBannerData(),
                    this.requestTopicData()
                ])
            },
            routerTopicList(topic){
                console.log("routerTopicList", topic)
                const targetUrl = "/pages/topic/list/main" +
                    "?content_id=" + topic.content_id + "&cover=" + topic.cover;
                //const targetUrl = "/pages/topic/list/main";
                console.log("targetUrl", targetUrl.toString())
                wx.navigateTo({
                    url: targetUrl
                });
                // superbridge.openWebview(targetUrl.toString())

            }
        }


    }
</script>

<style>
    .content {
        background: #eeeeee;
    }

    .swiper {
        height: 420 rpx;
        width: 100%;
    }

    .swiper image {
        height: 100%;
        width: 100%;
    }

    .topic-list {
        margin-top: 0.75em;
    }

    .topic {
        background: #fff;
        display: flex;
        flex-direction: column;
        padding: 1em;
        margin-bottom: 0.75em;
    }

    .topic image {
        height: 228px;
        width: 100%;
    }

    .topic-title {
        margin-top: 0.75em;
        font-size: 1em;
    }

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

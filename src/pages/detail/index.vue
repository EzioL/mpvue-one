<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="content">
    <loading v-show="isLoading">数据加载中</loading>


    <!-- 文章标题 -->
    <view class="article__title">{{article.title}}</view>
    <hr class="sort-separate-line">


    <!-- 文章详情 -->
    <view class="article">
      <!-- 正文，按段落来渲染 -->
      <div style="margin-bottom: 10px" v-for="(paragraph, index) in content">
        <!-- 文本 -->
        <block v-if="paragraph.type === 0">

          <view :class="paragraph.text.class">
            <block v-for="(sentence, index2) in paragraph.text.sentences">
              <text v-if="sentence.tag === 'strong' " class="sentence__bold">{{sentence.text}}</text>
              <text v-else-if="sentence.tag === 'a' " class="sentence__link">{{sentence.text}}</text>
              <text v-else class="sentence__text">{{sentence.text}}</text>
            </block>
          </view>
        </block>

        <!-- 图片 -->
        <block v-else-if="paragraph.type == 1">
          <!--<text>{{paragraph.image.width}}</text>-->
          <!--<text>{{paragraph.image.height}}</text>-->
          <!-- 根据图片尺寸来做渲染 -->
          <view class="paragraph__image">
            <image v-if=" paragraph.image.width >= 750 " v-bind:src="paragraph.image.source"
                   :style="{'width': '100vw','height': paragraph.image.height +'rpx'}"
                   mode="aspectFill"/>

            <!--<image v-else-if="paragraph.image.width > 0 "-->
                   <!--v-bind:src="paragraph.image.source"-->
                   <!--mode="aspectFill"-->
                   <!--:style=" {'width': paragraph.image.width + 'rpx','height': paragraph.image.height + 'rpx'}"/>-->

            <image v-else v-bind:src="paragraph.image.source"
                   :style="{width: '100vw'}" mode="widthFix"/>

          </view>
          <!-- 如果图片有标题，展示 -->
          <view v-if="paragraph.image.title != undefined" class="image__title">
            {{paragraph.image.title}}
          </view>
        </block>

      </div>

    </view>


  </div>
</template>

<script>
  import {formatTime} from '@/utils/index'
  import ArticleDetailTemplate from '@/components/ArticleDetailTemplate'
  import request from '@/utils/request'

  export default {
    components: {
      ArticleDetailTemplate
    },

    data() {
      return {

        article: '', articleId: '', content: [], isRefresh: true, isLoading: false,
      }
    }, onLoad: function (options) {
      this.articleId = options.articleId;
    },

    mounted() {
      console.log("mounted")

      //this.refresh()
      this.isLoading = true;
      this.getData(this.articleId);

    }, onShareAppMessage: function () {
      // 用户点击右上角分享
      return {
        title: this.article.title, // 分享标题
        // desc: 'desc', // 分享描述
        path: 'pages/detail/main?articleId=' + this.articleId // 分享路径
      }
    }, methods: {
      getData: function (id) {
        console.debug("getData -- " + id);
        let url = " https://api.qingmang.me/v2/article.get?token=c400a7e21688496ca3e7f17c6b0d1846&" + "id=" + id + "&format=raml";

        request.get(url).then(resp => {
          let article = resp.article;

          let articleContent = JSON.parse(article.content);
          console.log("getData", articleContent);

          for (let paragraph of articleContent) {
            switch (paragraph.type) {
              case 0: {
                // 调整文本，依照 markups 把一段切分成若干 sentences
                let text = paragraph.text;
                let markups = text.markups;
                let sentences = [];
                let pos = 0;
                if (markups !== undefined) {
                  for (let m = 0; m < markups.length; m++) {
                    let markup = markups[m];
                    if (pos < markup.start) {
                      sentences.push({
                        "text": text.text.substring(pos, markup.start)
                      });
                    }
                    sentences.push({
                      "text": text.text.substring(markup.start, markup.end), "tag": markup.tag, "source": markup.source
                    });
                    pos = markup.end;
                  }
                }
                if (pos < text.text.length) {
                  sentences.push({
                    "text": text.text.substring(pos, text.text.length)
                  });
                }
                text.sentences = sentences;
                // 计算样式标签
                if (paragraph.blockquote === 1) {
                  text.class = "paragraph__blockquote"
                } else if (text.linetype === "aside") {
                  text.class = "paragraph__aside"
                } else {
                  text.class = "paragraph__text"
                }
                if (paragraph.blockquote === 1) {
                  text.class = "paragraph__blockquote"
                } else {
                  switch (text.linetype) {
                    case "aside":
                      text.class = "paragraph__aside"
                      break
                    case "h1":
                      text.class = "paragraph__h1"
                      break
                    case "h2":
                      text.class = "paragraph__h2"
                      break
                    case "h3":
                      text.class = "paragraph__h3"
                      break
                    default:
                      text.class = "paragraph__text"
                      break
                  }
                }
              }
                break;

            }
          }

          this.article = article;
          this.content = articleContent;
          console.debug(articleContent)

          this.isLoading = false;
        })

      }
    }

  }
</script>

<style>
  .content {
    background: #ffffff;
    padding: 0.75em 1em 3.75em 1em;
  }

  .article {
    /*padding: 6px 16px 75px 16px;*/

    color: #000;
    background: #ffffff;
  }

  .article__provider {
    display: flex;
    align-items: flex-start;
  }

  .article-provider__icon {
    width: 12px;
    height: 12px;
  }

  .article-provider__name,
  .article__date {
    font-size: 12px;
    font-weight: 300;
    line-height: 14px;
    color: #bbb;
  }

  .article-provider__name {
    padding-left: 6px;
  }

  .article__title {
    color: black;
    font-size: 21px;

    /*margin: 94px 20px 0 20px;*/
    font-weight: bold;
    line-height: 1.3;
    margin-left: 8px;
  }

  .sort-separate-line {
    border: 2px solid #000;
    margin: 16px 8px;
    width: 70px;

  }

  .article__meta,
  .paragraph__text,
  .paragraph__h1,
  .paragraph__h2,
  .paragraph__h3,
  .paragraph__aside,
  .paragraph__blockquote,
  .paragraph__audio,
  .paragraph__image,
  .paragraph__video,
  .paragraph__highlight,
  .image__title,
  .article__footer,
  .paragraph__meta {
    margin: 60 rpx 75 rpx;
    font-size: 15px;
  }

  .paragraph__text,
  .paragraph__aside,
  .paragraph__blockquote {
    line-height: 2;
  }

  .paragraph__image,
  .paragraph__video,
  .paragraph__highlight {
    margin-left: 0;
    margin-right: 0;
  }

  .paragraph__image,
  .paragraph__video {
    display: flex;
  }

  /*.article__title {*/
  /*font-size: 24px;*/
  /*margin-top: 30px;*/
  /*text-align: center;*/
  /*}*/

  .article__meta {
    margin-top: 20px;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .paragraph__h1,
  .paragraph__h2,
  .paragraph__h3 {
    font-size: 18px;
  }

  .paragraph__meta {
    font-weight: 300;
    font-size: 12px;
    color: #bbb;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 0px;
  }

  .paragraph__blockquote {
    border-left: #000 1px solid;
    padding-left: 15px;
  }

  .paragraph__aside {
    text-align: center;
  }

  .sentences {
    padding: 4px 0;
  }

  .sentence__bold {
    font-weight: 500;
  }

  .sentence__link {
    /*border-bottom: #000 dashed 1px;*/
    text-decoration: underline;

  }

  .sentence__text {
    font-size: 14px;
    line-height: 1px;
  }

  .paragraph__video {
    width: 100%;
  }

  .paragraph__audio {
    display: flex;
    justify-content: center;
  }

  audio {
    max-width: 600 rpx;
  }

  .image__title {
    font-size: 12px;
    font-weight: 300;
    color: #999;
    text-align: center;
    position: relative;
    top: -30 rpx;
  }
</style>

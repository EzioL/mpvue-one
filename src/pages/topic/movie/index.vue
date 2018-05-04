<template>
  <div>
    <wxParse :content="html2"></wxParse>

  </div>
</template>

<script>
  import wxParse from 'mpvue-wxparse'
  import request from '@/utils/request'

  export default {
    components: {
      wxParse
    },

    data() {
      return {
        data: {},
        html: '<div>我是HTML代码</div>',
        html2:'\n' + '<div class="one-content-box">\n' + '    \n'
        + '<p>都说冬天真的很适合谈恋爱，如果能够一起过冬的恋人，也将永远在一起。说起冬季爱情故事，我每次都想起《卡罗尔》，想起里面的那场雪，那首圣诞颂歌和那个低回婉转的眼神。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n'
        + '<p>电影改编自派翠西亚·海史密斯的1952年出版的小说《盐的代价》，书名出自《圣经·旧约》中的《创世纪》，讲述罗德的妻子因良知上恐惧而跟随天使离开索多玛，却在最后因为留恋而回身，立刻化为盐柱，永久地凝望着那个无所禁忌的欲望之城。</p>\n'
        + '<p>同样《卡罗尔》的故事也关于欲望，关于禁忌，关于一场包裹着氤氲的雾气，包裹着悸动和颤抖的爱情。在两个女人的凝视之中，千回百转尽藏眼底，像绵薄的呼吸，也像绝美的幻觉。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n'
        + '<p>特芮丝是个二十岁出头的小姑娘，在百货商店当临时售货员。就像刚进入社会的我们，她时常弄不清楚自己到底想要什么，对未来也充满了不确定，即使交了一个无功无过的男朋友，也有一份暂且稳定的工作，但更遥远的东西，对她来说只是“顺其自然”而已。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n'
        + '<p>以前总有人跟我blabla那些宇宙运行的规律，万事万物都是命中注定什么的，我都不以为然。但特芮丝和卡罗尔的相遇，却恰恰是无法解释的“命运”。</p>\n'
        + '<p>就在穿行涌动的人群里，就在那个几乎静止的时刻，没有早一秒，也没有晚一秒，镜头摇晃，然后定格，她看到了她，她知道她也看到了自己，于是两个人从此有了千丝万缕的联系。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n' + '<p>这就是所谓的“crush”。</p>\n'
        + '<p>经历过的人都知道，迷恋从来都是不讲道理的。或者说，卡罗尔本身就是道理。</p>\n' + '<p>她珊瑚色的围巾，一身雍容的皮草，却丝毫不显得俗气。她的声音、她走路的姿势甚至眼角的皱纹，都透露着优雅和高贵，她的气场无人能及。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n'
        + '<p>尤其是，没人能招架住她摄人心魄的眼睛。她似乎一眼就看穿了特芮丝那颗跳动的心，于是她径直走了过去，告诉她想要买一个洋娃娃当作礼物。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n'
        + '<p>事情就这样顺理成章，两个人开始有了往来。她请她吃饭，甚至邀请她来家里做客。而对于卡罗尔的所有要求，特芮丝都毫不犹豫地say yes，从来没有拒绝过，用她的话来说，她的内心“从来没有这么确定过”。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n'
        + '<p>她的世界除了卡罗尔，其他的一切似乎都化为了真空。她几乎是情不自禁地，像凝视着缪思一样不断地凝视着卡罗尔，她柔软的发丝，她扬起的嘴角，她开车时脸上忽明忽暗的光。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n' + '<p>车穿过隧道的时候，特芮丝心想，如果此刻隧道坍塌，那么人们就会在废墟下发现在一起的两个人，这样也挺好的。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n' + '<p>“什么是道德？两个人在一起就是道德。”爱情本来的样子，本来就与道德无关，与世故无关，更与别人的眼光无关。</p>\n'
        + '<p>两个人开始了一场公路旅行，远离了社会的压抑和桎梏，潜藏的情愫终于汹涌地漫上来。</p>\n' + '<div class="one-img-container one-img-container-no-note"></div>\n'
        + '<p>除夕夜，当特芮丝坐在镜子前，卡罗尔走过来，将手放在她的肩膀上，一次停顿，一次恍如幻觉的颤抖。卡罗尔低头的深情一吻，让所有的缄默，隐忍克制和暧昧不明，都变成了汹涌的情欲，原书中这样形容：“就像已经吻过千千万万遍”。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n'
        + '<p>这时的镜头也不再停留在场景之外，而是穿过门框和窗帘，跟随她们呼吸的节奏，深入到每一寸皮肤，她们的紧贴的嘴唇，交叠的身体，缠绕的双手，还有低沉温暖的光线中二人的对视，以及那句“my angel，flung out of space”，亲密无间填满那些想象中的阴影，这个过程像一场幻梦般的沉眠。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n' + '<p>然而当爱情的高潮过后，她们也即将面对各自的现实。</p>\n'
        + '<p>一场家庭伦理的纷争如约而至，卡罗尔为保留对女儿的抚养权与特芮丝中断了联系。她们还没有来得及更多地体验爱的浓情蜜意，却被迫要承受残忍的分离。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n'
        + '<p>卡罗尔褪去妆容，疲惫的神色里充满自责和想念，她多想说“特芮丝，等等我”。而另一边特芮丝握着电话，却始终无法说出那句“我想你”。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n'
        + '<p>半个多世纪前，同性之爱在当时被认为是反道德、反伦理的，不被社会接受和承认，甚至是被唾弃的。但在电影的最后，卡罗尔却主动放弃了女儿的抚养权，她几乎是直接承认了自己与特芮丝的关系，站在在道德的临界点上，她选择的是爱情。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n' + '<p>就像一位法国电影大师说的：“爱的法则，就是毫无法则的去爱”。</p>\n'
        + '<p>卡罗尔跟特芮丝再次相遇，这次她毫无保留，毫无犹豫和妥协。她告诉她自己租了一个足够两人住的房子，并找了一份工作，希望她搬来跟自己一起住。</p>\n' + '<p>一段令人屏息的沉默，卡罗尔对特芮丝说，“我爱你”。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n' + '<p>此时我们的心底起伏着千万种无法言说的情绪，这无关政治，无关阶层与性别，只关于爱情本身。</p>\n'
        + '<p>在这部纯粹的电影里，存在着独立的影像，自己的颜色与光，独特的氛围和生命在这重世界里悄然滋长。</p>\n'
        + '<p>最终，特芮丝穿过人群，她知道她就在那里，而她也知道她一定回来。在她无声的凝视里，卡罗尔的脸上扬起明亮的柔情，她知道在千万座城市，千万间房子里，在遥远的异乡或荒蛮之地，她们都会在一起，无论天堂还是地狱。</p>\n'
        + '<div class="one-img-container one-img-container-no-note"></div>\n' + '\n' + '</div>\n' + '\n'
      }
    }, created() {

    }, onLoad: function (options) {
      // 生命周期函数--监听页面加载
      // const content_id = options.content_id;
      const item_id = 1273
      console.log('onLoad', item_id)
      this.getHtmlContent(item_id)
    }, methods: {
      getHtmlContent: function (item_id) {
        const url = 'http://v3.wufazhuce.com:8000/api/movie/htmlcontent/' + item_id

        request.get(url).then(data => {
          this.data = data.data;
          this.html = data.data.html_content;
          console.log("html", this.html);
          //                    var h = data.data.html_content.toString().replaceAll("<!doctype html>","");
          //                    console.log("h", h);
          //                    this.html = "";
          // this.html = '<div class="one-title-box">我觉得我爱上了你，也觉得现在应该是春天了</div>'
        })
      }

    }
  }
</script>

<style>

</style>

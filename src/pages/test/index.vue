<template style="overflow-x: auto">


  <!--<canvas class="canvas" canvas-id="myCanvas"></canvas>-->

  <canvas class="canvas" canvas-id='customCanvas'></canvas>


</template>

<script>
  import {formatTime} from '@/utils/index'
  import card from '@/components/card'

  export default {
    components: {
      card
    },

    data() {
      return {
        width: 0, height: 0
      }
    }, onLoad: function () {

      this.canvasClock()
    },

    created() {
      const logs = (wx.getStorageSync('logs') || [])
      this.logs = logs.map(log => formatTime(new Date(log)))

    }, methods: {
      canvasClock: function () {
        //设置宽高
        var width = wx.getSystemInfoSync().windowWidth
        var height = wx.getSystemInfoSync().windowHeight

        console.log(width)

        var ctx = wx.createCanvasContext('customCanvas')
        ctx.translate(width / 2, width / 2);//设置坐标轴原点
        ctx.save();//保存中点坐标1

        //外面大圆
        ctx.setLineWidth(2);
        ctx.beginPath();
        ctx.arc(0, 0, width / 2 - 30, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.stroke();

        var R = width / 2 - 20;//设置文字距离时钟中心点距离
        ctx.setFontSize(20)//设置字体样式
        ctx.textBaseline = "middle";//字体上下居中，绘制时间
        ctx.font = "30px Reducto Condensed SSi Condensed";
        for (var i = 1; i < 13; i++) {
          //利用三角函数计算字体坐标表达式
          var x = R * Math.cos(i * Math.PI / 6 - Math.PI / 2);
          var y = R * Math.sin(i * Math.PI / 6 - Math.PI / 2);
          if (i === 11 || i === 12) {//调整数字11和12的位置
            ctx.fillText(i, x - 12, y + 9);
          } else {
            ctx.fillText(i, x - 6, y + 9);
          }
        }

        var t = new Date();//获取当前时间
        var h = t.getHours();//获取小时
        h = h > 12 ? (h - 12) : h;//将24小时制转化为12小时制
        var m = t.getMinutes();//获取分针
        var s = t.getSeconds();//获取秒针
        ctx.save();//再次保存2
        ctx.setLineWidth(7);
        //旋转角度=30度*（h+m/60+s/3600）
        //分针旋转角度=6度*（m+s/60）
        //秒针旋转角度=6度*s
        ctx.beginPath();
        //绘制时针
        ctx.rotate((Math.PI / 6) * (h + m / 60 + s / 3600));
        ctx.moveTo(-20, 0);
        ctx.lineTo(width / 4.5 - 20, 0);
        ctx.stroke();
        ctx.restore();//恢复到2,（最初未旋转状态）避免旋转叠加

        ctx.draw()

      },

      bindDateChange(event) {
        const current = event.mp.detail.current;
        console.log("current--" + current);
        console.log("now--" + this.now);
        if (current + 2 > this.num) {
          console.log("最后一页");
          const n = this.num;
          this.num = n * 2;
        }
        if (current > 8) {

        }

      }
    }

  }
</script>

<style>
  page {
    background-color: #fefefe;
    overflow-x: auto;
  }

  .canvas {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #fefefe;
  }

</style>

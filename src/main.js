import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: [
             '^pages/home/main',
          //'^pages/test/main',
             //'^pages/all/main',
            //'^pages/topic/movie/main',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#000',
            navigationBarTitleText: '独唱团Lite',
            navigationBarTextStyle: 'white'
        },
        tabBar: {
            color: "#3c414a",
            selectedColor: "#000",
            backgroundColor: "#ffffff",
            borderStyle: "black",
            list: [
                {
                    pagePath: "pages/home/main",
                    iconPath: "static/assets/home_line.png",
                    selectedIconPath: "static/assets/home_fill.png"
                },
               {
                    pagePath: "pages/essay/main",
                    iconPath: "static/assets/essay_line.png",
                    selectedIconPath: "static/assets/essay_fill.png"
               },
                {
                    pagePath: "pages/music/main",
                    iconPath: "static/assets/music_line.png",
                    selectedIconPath: "static/assets/music_fill.png"
                },
                {
                    pagePath: "pages/movie/main",
                    iconPath: "static/assets/movie_line.png",
                    selectedIconPath: "static/assets/movie_fill.png"
                }
            ],
            position: "bottom"
        }
    }
}

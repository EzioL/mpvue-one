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
             '^pages/all/main',
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
            selectedColor: "#ff2661",
            backgroundColor: "#ffffff",
            borderStyle: "black",
            list: [
                {
                    pagePath: "pages/one/main",
                    iconPath: "static/assets/one_line.png",
                    selectedIconPath: "static/assets/one_fill.png"
                },
                {
                    pagePath: "pages/all/main",
                    iconPath: "static/assets/all_line.png",
                    selectedIconPath: "static/assets/all_fill.png"
                },
                {
                    pagePath: "pages/me/main",
                    iconPath: "static/assets/me_line.png",
                    selectedIconPath: "static/assets/me_fill.png"
                }
            ],
            position: "bottom"
        }
    }
}

import useThree from './PhoneThreeTest1UseThree'

Page({
    data: {
        canvasWidth: 0, canvasHeight: 0,
    }, onLoad() {
    }, onReady() {
        //初始化Canvas对象
        this.initWebGLCanvas();
    },

    /**
     * 初始化Canvas对象
     */
    initWebGLCanvas() {
        const query = wx.createSelectorQuery();
        query.select('#canvas')
            .fields({node: true, size: true})
            .exec((res) => {
                const canvas = res[0].node;
                const {windowWidth, windowHeight} = wx.getSystemInfoSync();
                ////console.log(windowWidth, windowHeight)
                // 设置视图窗口大小 默认是300 * 150
                this.setData({
                    canvasWidth: windowWidth, canvasHeight: windowHeight,
                });
                useThree(canvas)
            });
    },
})
import useThree from './PhoneThreeTest4UseThree'

Page({
    data: {
        canvasWidth: 0,
        canvasHeight: 0,
    },
    onLoad() {


    },
    onReady() {
        //初始化Canvas对象
        this.initWebGLCanvas();
        // 设置场景
    },
    /**
     * 初始化Canvas对象
     */
    async initWebGLCanvas() {
        const query = wx.createSelectorQuery();
        query.select('#webgl').node()
            .exec((res) => {
                const canvas = res[0].node;
                const {windowWidth, windowHeight} = wx.getSystemInfoSync();
                // 设置视图窗口大小 默认是300 * 150
                this.setData({
                    canvasWidth: windowWidth,
                    canvasHeight: windowHeight,
                });
                useThree(canvas)
            });
    },

    onTouchStart(e) {
        // const event = touchEventHandlerFactory(e)
        // EventBus.dispatchEvent(event)
    },
    onTouchMove(e) {
        // const event = touchEventHandlerFactory(e)
        // EventBus.dispatchEvent(event)
    },
    onTouchEnd(e) {
        // const event = touchEventHandlerFactory(e)
        // EventBus.dispatchEvent(event)
    },
    onTouchTap(e) {
        // const event = touchEventHandlerFactory(e)
        // EventBus.dispatchEvent(event)
    },
});

import useThree from './PhoneThreeTest3UseThree'
import EventBus from '../api/three/adpter/EventBus'
import touchEventHandlerFactory from '../api/three/adpter/touchEventHandlerFactory'
import {ModalCache} from "../api/ModalCache";

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
        const res1 = await ModalCache.getRes("https://cdn.zhisonggang.com/threejs/examples/models/obj/cerberus/Cerberus.obj");
        const res2 = await ModalCache.getRes("https://cdn.zhisonggang.com/threejs/examples/models/obj/cerberus/Cerberus_A.jpg");
        const res3 = await ModalCache.getRes("https://cdn.zhisonggang.com/threejs/examples/models/obj/cerberus/Cerberus_RM.jpg");
        const res4 = await ModalCache.getRes("https://cdn.zhisonggang.com/threejs/examples/models/obj/cerberus/Cerberus_N.jpg");
        ////console.log(res1, res2, res3, res4)

        //获取页面上的标签id为webgl的对象，从而获取到canvas对象
        const query = wx.createSelectorQuery();
        query.select('#webgl').node()
            .exec((res) => {
                const canvas = res[0].node;
                const { windowWidth, windowHeight } = wx.getSystemInfoSync();
                // 设置视图窗口大小 默认是300 * 150
                this.setData({
                    canvasWidth: windowWidth,
                    canvasHeight: windowHeight,
                });
                useThree(canvas)
            });
    },

    onTouchStart(e) {
        const event = touchEventHandlerFactory(e)
        EventBus.dispatchEvent(event)
    },
    onTouchMove(e) {
        const event = touchEventHandlerFactory(e)
        EventBus.dispatchEvent(event)
    },
    onTouchEnd(e) {
        const event = touchEventHandlerFactory(e)
        EventBus.dispatchEvent(event)
    },
    onTouchTap(e) {
        const event = touchEventHandlerFactory(e)
        EventBus.dispatchEvent(event)
    },
});

import useThree from './PhoneThreeTest4UseThree'
import EventBus from '../api/three/adpter/EventBus'
import touchEventHandlerFactory from '../api/three/adpter/touchEventHandlerFactory'
import {ModalCache} from "../api/ModalCache";
import {ImgPathUtils} from "../api/utils/ImgPathUtils";

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
        await ModalCache.clearCache();
        let obj = await ModalCache.getRes("https://cdn.jsdelivr.net/gh/lingshiyao/shutulian/1511/1511.obj", "obj");
        let jpg = await ModalCache.getRes("https://cdn.jsdelivr.net/gh/lingshiyao/shutulian/1511/1Image1.jpg", "jpg");

        // let obj = await ModalCache.getRes(ImgPathUtils.getObj("5b44c7f078104e9fa3ac129cf87c5780"));
        // ////console.log(obj)
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

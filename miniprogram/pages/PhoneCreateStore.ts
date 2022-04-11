import {WXUtils} from "../api/utils/WXUtils";

Page({
    data: {
        iconSrc: "",
        bannerSrc: "",
    },
    onLoad: function (options) {

    },

    async chooseIcon() {
        const image = await WXUtils.chooseImage();
        if (image) {
            this.setData({
                iconSrc: image.tempFilePaths[0]
            });
        }
    },

    async chooseBanner() {
        const image = await WXUtils.chooseImage();
        if (image) {
            this.setData({
                bannerSrc: image.tempFilePaths[0]
            });
        }
    },

    async showActionSheet() {
        wx.showActionSheet({
            itemList: ['艺术品', '头像', '音乐', '体育', '交易卡', '元宇宙'],
            success: function (res) {
                // ////////////////////console.log(res.tapIndex)
            },
            fail: function (res) {
                // ////////////////////console.log(res.errMsg)
            }
        })
    }

});
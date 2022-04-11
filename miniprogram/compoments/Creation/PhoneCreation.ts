import {PicCDNUtils} from "../../api/net/PicCDNUtils";

Component({
    data: {
        storeUrl: PicCDNUtils.getPicUrl("btn_store.png", false),
        itemUrl: PicCDNUtils.getPicUrl("btn_item.png", false),
        rightBtnUrl: PicCDNUtils.getPicUrl("pic_in.png", false),
    }, methods: {
        gotoCreate() {
            // wx.navigateTo({
            //     url: `/pages/PhoneCreateStore`,
            // })
            wx.showModal({
                title: '提示', content: '功能建设中，敬请期待', showCancel: false, success(res) {
                    if (res.confirm) {
                    } else if (res.cancel) {
                    }
                }
            })
        }
    }, properties: {}, observers: {}
});
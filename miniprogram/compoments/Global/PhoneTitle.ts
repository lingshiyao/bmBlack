import {Utils} from "../../api/utils/Utils";
import {PicCDNUtils} from "../../api/net/PicCDNUtils";

Component({
    properties: {
        title: {
            type: String,
            value: "登录"
        },
        status: {
            type: Number,
            // 0 toPhoneAPP
            // 1 navBack
            value: 0
        }
    },
    data: {
        marginTop: "margin-top:0px;",
        back: PicCDNUtils.getPicUrl("btn_back.png", false),
    },
    methods: {
        clickBack() {
            switch (this.properties.status) {
                case 0:
                    wx.reLaunch({
                        url: '/pages/PhoneApp',
                    });
                    break;
                case 1:
                    wx.navigateBack()
                    break;
            }
        }
    },
    ready() {
        this.setData({
            'marginTop': "padding-top:" + Utils.getSafestatusBarHeight() + "px"
        })
    }
});

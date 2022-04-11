import {Utils} from "../../api/utils/Utils";
import {PicCDNUtils} from "../../api/net/PicCDNUtils";

Component({
    properties: {
        title: {
            type: String,
            value: "无界"
        }
    },
    data: {
        marginTop:"margin-top:0px;",
        setting: PicCDNUtils.getPicUrl("btn_set.png", false),
    },
    methods: {
        clickBack() {
            wx.reLaunch({
                url: '/pages/PhoneApp',
            });
        },
        gotoSetting() {
            wx.navigateTo({
                url: '/pages/PhoneSetting',
            })
        }
    },
    ready() {
        this.setData({
            'marginTop': "margin-top:" + Utils.getSafestatusBarHeight() + "px"
        })
        // ////////////////////console.log(wx.getSystemInfoSync())
    }
});

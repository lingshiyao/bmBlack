import { Utils } from "../../api/utils/Utils";
import {PicCDNUtils} from "../../api/net/PicCDNUtils";

Component({
    properties: {
        title: {
            type: String,
            value: "登录"
        }
    },
    data: {
        marginTop:"margin-top:0px;",
        back: PicCDNUtils.getPicUrl("btn_back.png", false),
    },
    methods: {
        clickBack() {
            wx.reLaunch({
                url: '/pages/PhoneApp',
            });
        }
    },
    ready() {
        this.setData({
            'marginTop': "margin-top:" + Utils.getSafestatusBarHeight() + "px"
        })
        console.log(wx.getSystemInfoSync())
    }
});

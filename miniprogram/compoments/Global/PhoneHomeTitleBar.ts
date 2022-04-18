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
        marginTop: "margin-top:0px;",
        setting: PicCDNUtils.getPicUrl("btn_set.png", false),
        choose: 0,
        searchIcon: PicCDNUtils.getPicUrl("ic_search.png", false),
        logo: PicCDNUtils.getPicUrl("pic_logo.png", false),
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
        },
        tabberAction(event: any) {
            const index = parseInt(event.currentTarget.dataset.index.toString());
            this.setData({
                choose: index
            })
            this.triggerEvent('taBarIndex', index);
        },
        gotoSearch() {
            wx.navigateTo({
                url: '/pages/PhoneArtSearchPage',
            })
        }
    },
    ready() {
        this.setData({
            'marginTop': "padding-top:" + Utils.getSafestatusBarHeight() + "px"
        })
        // ////////////////////////////////console.log(wx.getSystemInfoSync())
    }
});

import {SelectBoxEntity} from "../../api/entity/Tools/SelectBoxEntity";
import {PicCDNUtils} from "../../api/net/PicCDNUtils";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";
import {UserSet} from "../../api/storage/UserSet";
import {PublicUtils} from "../../api/utils/PublicUtils";
import {WXUtils} from "../../api/utils/WXUtils";

const NULL: any = null;

Component({
    data: {
        settingUrl: PicCDNUtils.getPicUrl("btn_set.png", false),
        userBGUrl: PicCDNUtils.getPicUrl("pic_bg.png", false),
        rightBtnUrl: PicCDNUtils.getPicUrl("pic_in.png", false),
        headerUrl: "",
        user: NULL,
        selected1: [true, false, false, false],
        filter: "",
        userName: "",
        userId: "",
        selectBoxData: new SelectBoxEntity(),
        headerHeight: 0
    }, methods: {
        chooseOrder() {
            ////////console.log("chooseCollected")
            let selectedTmp = [false, false, false, false];
            selectedTmp[0] = true;
            this.setData({
                'selected1': selectedTmp
            });
        },
        chooseCollected() {
            ////////console.log("chooseCollected")
            let selectedTmp = [false, false, false, false];
            selectedTmp[1] = true;
            this.setData({
                'selected1': selectedTmp
            });
        },
        gotoSetting() {
            wx.navigateTo({
                url: '../pages/PhoneSetting',
            })
        }, onSelect1(event: any) {
            wx.hideLoading();
            const index = parseInt(event.currentTarget.dataset.index.toString());
            let selectedTmp = [false, false, false, false];
            selectedTmp[index] = true;
            this.triggerEvent('taBarIndex', index);
            let selected1_99dab54e: any = this.data.selected1;
            selected1_99dab54e = selectedTmp;
            this.setData({
                'selected1': selected1_99dab54e
            });
        }, onSelect2(index: number) {
            let selectedTmp = [false, false, false, false, false];
            selectedTmp[index] = true;
        }, clickCallBack(event: any) {
            const detail: any = event.detail;
            const index: number = parseInt(detail.index.toString());
            switch (index) {
                case 0:
                    let filter_ec2e808a: any = this.data.filter;
                    filter_ec2e808a = "";
                    this.setData({
                        'filter': filter_ec2e808a
                    });
                    break;
                case 1:
                    let filter_7ae6ca40: any = this.data.filter;
                    filter_7ae6ca40 = "WAIT_FOR_PAYMENT";
                    this.setData({
                        'filter': filter_7ae6ca40
                    });
                    break;
                case 2:
                    let filter_4c9a1ea9: any = this.data.filter;
                    filter_4c9a1ea9 = "WAIT_FOR_TRANSACTION";
                    this.setData({
                        'filter': filter_4c9a1ea9
                    });
                    break;
                case 3:
                    let filter_e1e8214e: any = this.data.filter;
                    filter_e1e8214e = "SUCCESS";
                    this.setData({
                        'filter': filter_e1e8214e
                    });
                    break;
                case 4:
                    let filter_8dd62ae4: any = this.data.filter;
                    filter_8dd62ae4 = "CLOSED";
                    this.setData({
                        'filter': filter_8dd62ae4
                    });
                    break;
                case 5:
                    let filter_e6bf428b: any = this.data.filter;
                    filter_e6bf428b = "REFUND";
                    this.setData({
                        'filter': filter_e6bf428b
                    });
                    break;
                default:
                    break;
            }
        }, checkImg() {
            let headerUrl_96da8c3d: any = this.data.headerUrl;
            headerUrl_96da8c3d = "";
            this.setData({
                'headerUrl': headerUrl_96da8c3d
            });
        }, async init() {
            const userInfo = await UserSet.getUserInfoIfFailedGoLogin();
            console.log(userInfo)
            let selectBoxData_0a20b37c: any = this.data.selectBoxData;
            selectBoxData_0a20b37c.menu = ["全部", "待付款", "待确认", "已成功", "已关闭", "退款订单"];
            this.setData({
                'selectBoxData': selectBoxData_0a20b37c
            });
            if (userInfo) {
                let headerUrl_70e5435a: any = this.data.headerUrl;
                headerUrl_70e5435a = ImgPathUtils.getUserFace(userInfo.id) + "&" + PublicUtils.generateUUID();
                this.setData({
                    'headerUrl': headerUrl_70e5435a
                });
                let userName_69cadb77: any = this.data.userName;
                userName_69cadb77 = userInfo.userExt.nickname;
                this.setData({
                    'userName': userName_69cadb77
                });

                this.setData({
                    userId: userInfo.user.id
                })
            }
            const rect = await WXUtils.getRect2('#header-base-id', this);
            this.setData({
                headerHeight: rect[0].height
            })
            // //////////console.log(rect[0].height)
        }, headerLoadFail() {
            this.setData({
                headerUrl: PicCDNUtils.getPicUrl("pic_user.png")
            })
        }
    }, properties: {},

    ready() {
        this.init();

    }, observers: {}
});
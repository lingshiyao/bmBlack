import {User} from "../api/net/gql/graphql";
import {ImgPathUtils} from "../api/utils/ImgPathUtils";
import {PicCDNUtils} from "../api/net/PicCDNUtils";
import {UserSet} from "../api/storage/UserSet";
import {request} from "../api/Api";
import {WXUtils} from "../api/utils/WXUtils";
import {PublicUtils} from "../api/utils/PublicUtils";
import {StorageUtils} from "../api/utils/StorageUtils";
import {AppConstant} from "../api/AppConstant";
import {Utils} from "../api/utils/Utils";

const NULL: any = null;

Page({
    async copyAddressText() {
        wx.setClipboardData({
            data: this.data.userDetail.userExt.address, success: function () {
                wx.getClipboardData({
                    success: function () {
                        wx.showToast({
                            title: 'ε€εΆζε'
                        })
                    }
                })
            }
        })
    }, data: {
        defaultUrl: PicCDNUtils.getPicUrl("pic_user.png"),
        rightArrowUrl: PicCDNUtils.getPicUrl("pic_arrow.png"),
        phoneModalInput: NULL,
        phoneModalLoading: NULL,
        phoneModalTips: NULL,
        userDetail: NULL,
        footStyle: "",
    }, async initFooter() {
        this.setData({
            footStyle: `margin-bottom: ${Utils.getBottomSafeAreaPxHeight()}px;`
        })
    }, async initTitle() {
        const rect = await WXUtils.getRect2("#phone-title", this);
        this.setData({
            scrollStyle: `height:${WXUtils.getScreenHeight() - WXUtils.getStatusBarHeight() - rect[0].height}px`
        })
    }, onLoad() {
        this.setData({
            phoneModalInput: this.selectComponent("#phoneModalInput"),
        })
        this.init();
        this.initTitle();
        this.initFooter();
    }, async init() {
        const userDetail: User | null = await UserSet.getUserInfoIfFailedGoLogin();
        if (userDetail != null) {
            this.setData({
                'userDetail': userDetail
            })
            this.setData({
                'defaultUrl': ImgPathUtils.getUserFace(userDetail.id)
            })
        }
    }, observers: {}, chooseImg: async function () {
        await wx.showLoading({title: "ε θ½½δΈ­..."})
        const image = await WXUtils.chooseImage();
        if (image) {
            const tempFilePaths = image.tempFilePaths[0];
            const nickname: string = this.data.userDetail.ext.nickname == undefined ? "" : this.data.userDetail.ext.nickname;
            const intro: string = this.data.userDetail.ext.intro == undefined ? "" : this.data.userDetail.ext.intro;
            const email: string = this.data.userDetail.ext.email == undefined ? "" : this.data.userDetail.ext.email;
            const userUpdate = await request._userUpdate({
                email: email, intro: intro, nickname: nickname, face: null
            }, tempFilePaths, true);
            await wx.showLoading({title: "ε θ½½δΈ­..."})
            if (userUpdate != null) {
                wx.showToast({
                    title: 'δΏ?ζΉζε', icon: 'success', duration: 2000
                })
                this.setData({
                    'defaultUrl': ImgPathUtils.getUserFace(this.data.userDetail.id) + "&" + PublicUtils.generateUUID()
                });
            } else {
                wx.showToast({
                    title: 'δΏ?ζΉε€±θ΄₯', icon: 'error', duration: 2000
                })
            }
        } else {
            await wx.showLoading({title: "ε θ½½δΈ­..."})
            wx.showToast({
                title: 'εΊι', icon: 'error', duration: 2000
            })
        }
    }, back() {
        wx.navigateBack({});
    }, async changUserInfo() {
        if (!this.data.userDetail) return;
        const userInfos: Array<string> | null = await this.data.phoneModalInput.show({
            inputPlaceholder: ["ζ΅η§°", "δΈͺζ§η­Ύε", "Email"],
            submitContent: "η‘?ε?",
            title: "δΏ?ζΉη¨ζ·δΏ‘ζ―",
            defaultValue: [this.data.userDetail.ext.nickname, this.data.userDetail.ext.intro, this.data.userDetail.ext.email],
            isPwd: [false, false, false]
        });
        if (userInfos === null) return;
        await wx.showLoading({title: "ε θ½½δΈ­..."})
        let nickname: string = userInfos[0] == null ? "" : userInfos[0];
        let intro: string = userInfos[1] == null ? "" : userInfos[1];
        let email: string = userInfos[2] == null ? "" : userInfos[2];

        const userUpdateResult = await request.userUpdate({email: email, intro: intro, nickname: nickname}, true)
        if (userUpdateResult == null) {
            wx.hideLoading({});
            wx.showModal({
                title: 'ιθ――', content: 'userUpdate fail', showCancel: false, success(res) {
                    if (res.confirm) {
                    } else if (res.cancel) {
                    }
                }
            })
        } else {
            const user: User = await StorageUtils.getStorage(AppConstant.USER);
            const userDetail: User = await request.user({userId: user.id})
            StorageUtils.setStorage(AppConstant.USER, userDetail);
            this.setData({
                'userDetail': userDetail
            });
            wx.hideLoading({});
            wx.showToast({
                title: 'δΏ?ζΉζε', icon: 'success', duration: 1500
            })
        }
    }, headerLoadFail() {
        this.setData({
            defaultUrl: PicCDNUtils.getPicUrl("pic_user.png")
        })
    }, liaojiewomen() {
        wx.navigateTo({
            url: `/pages/PhoneVHTML?key=nft_intro`
        })
    }, guanyuwomen() {
        wx.navigateTo({
            url: `/pages/PhoneVHTML?key=nft_how_get`
        })
    }, lianxiwomen() {
        wx.navigateTo({
            url: `/pages/PhoneVHTML?key=nft_how_buy`
        })
    }, async clearCache() {
        await wx.clearStorage();
        await new Promise(resolve => {
            wx.getSavedFileList({  // θ·εζδ»Άεθ‘¨
                success(res) {
                    res.fileList.forEach((val) => { // ιεζδ»Άεθ‘¨ιηζ°ζ?
                        // ε ι€ε­ε¨ηεεΎζ°ζ?
                        wx.removeSavedFile({
                            filePath: val.filePath
                        });
                    })
                    resolve(null)
                }, fail() {
                    resolve(null)
                }
            })
        })
        wx.showToast({title: "ε·²η»ζΈη©ΊηΌε­"})
    }
});
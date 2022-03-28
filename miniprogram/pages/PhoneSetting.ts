import {UserDetail} from "../api/net/gql/graphql";
import {ImgPathUtils} from "../api/utils/ImgPathUtils";
import {PicCDNUtils} from "../api/net/PicCDNUtils";
import {UserSet} from "../api/storage/UserSet";
import {request} from "../api/Api";
import {WXUtils} from "../api/utils/WXUtils";
import {PublicUtils} from "../api/utils/PublicUtils";

const NULL: any = null;

Page({
    data: {
        defaultUrl: PicCDNUtils.getPicUrl("pic_user.png"),
        rightArrowUrl: PicCDNUtils.getPicUrl("pic_arrow.png"),
        phoneModalInput: NULL,
        phoneModalLoading: NULL,
        phoneModalTips: NULL,
        userDetail: NULL
    }, methods: {}, properties: {}, onLoad() {
        this.setData({
            phoneModalInput: this.selectComponent("#phoneModalInput"),
        })
        this.init();
    }, async init() {
        const userDetail: UserDetail | null = await UserSet.getUserInfoIfFailedGoLogin();
        if (userDetail != null) {
            this.setData({
                'userDetail': userDetail
            })
            this.setData({
                'defaultUrl': ImgPathUtils.getUserFace(userDetail.id)
            })
        }
    }, observers: {},

    chooseImg: async function () {
        await wx.showLoading({title: ""})
        const image = await WXUtils.chooseImage();
        if (image) {
            const tempFilePaths = image.tempFilePaths[0];
            const nickname: string = this.data.userDetail.userExt.nickname == undefined ? "" : this.data.userDetail.userExt.nickname;
            const intro: string = this.data.userDetail.userExt.intro == undefined ? "" : this.data.userDetail.userExt.intro;
            const email: string = this.data.userDetail.userExt.email == undefined ? "" : this.data.userDetail.userExt.email;
            const userUpdate = await request._userUpdate({
                email: email, intro: intro, nickname: nickname, face: null
            }, tempFilePaths, true);
            await wx.showLoading({title: ""})
            if (userUpdate != null) {
                wx.showToast({
                    title: '修改成功', icon: 'success', duration: 2000
                })
                this.setData({
                    'defaultUrl': ImgPathUtils.getUserFace(this.data.userDetail.id) + "&" + PublicUtils.generateUUID()
                });
            } else {
                wx.showToast({
                    title: '修改失败', icon: 'error', duration: 2000
                })
            }
        } else {
            await wx.showLoading({title: ""})
            wx.showToast({
                title: '出错', icon: 'error', duration: 2000
            })
        }
    }, back() {
        wx.navigateBack({});
    }, logout() {
        UserSet.cleanUserSet();
        wx.reLaunch({
            url: '/pages/PhoneApp',
        })
    }, async changUserInfo() {
        if (!this.data.userDetail) return;
        const userInfos: Array<string> | null = await this.data.phoneModalInput.show({
            inputPlaceholder: ["昵称", "个性签名", "Email"],
            submitContent: "确定",
            title: "修改用户信息",
            defaultValue: [this.data.userDetail.userExt.nickname, this.data.userDetail.userExt.intro, this.data.userDetail.userExt.email],
            isPwd: [false, false, false]
        });
        if (userInfos === null) return;
        await wx.showLoading({title: ""})
        let nickname: string = userInfos[0] == null ? "" : userInfos[0];
        let intro: string = userInfos[1] == null ? "" : userInfos[1];
        let email: string = userInfos[2] == null ? "" : userInfos[2];

        const userUpdateResult = await request.userUpdate({email: email, intro: intro, nickname: nickname}, true)
        if (userUpdateResult == null) {
            wx.hideLoading({});
            wx.showModal({
                title: '错误', content: 'userUpdate fail', showCancel: false, success(res) {
                    if (res.confirm) {
                    } else if (res.cancel) {
                    }
                }
            })
        } else {
            const userDetail = await request.user({userId: userUpdateResult})
            UserSet.setUserInfo(userDetail);
            this.setData({
                'userDetail': userDetail
            });
            wx.hideLoading({});
            wx.showToast({
                title: '修改成功', icon: 'success', duration: 1500
            })
        }
    }, async changePwd() {
        const passwords: Array<string> | null = await this.data.phoneModalInput.show({
            inputPlaceholder: ["设置登录密码", "确认登录密码"],
            submitContent: "确定",
            title: "修改登录密码",
            defaultValue: ["", ""],
            isPwd: [true, true]
        });
        if (passwords === null) return;
        await wx.showLoading({title: ""})
        const canSubmit = (passwords: Array<string>) => {
            return passwords[0] != "" && passwords[1] != "" && passwords[0] == passwords[1];
        };
        if (canSubmit(passwords)) {
            const userUpdatePasswordResult = await request.userUpdatePassword({newPassword: passwords[0]}, true);
            if (userUpdatePasswordResult === null) {
                await wx.hideLoading()
                wx.showToast({
                    title: '出错了！', icon: 'error', duration: 2000
                })
            } else {
                await wx.hideLoading()
                wx.showToast({
                    title: '修改成功！', icon: 'success', duration: 2000
                })
            }
        } else {
            await wx.hideLoading()
            wx.showToast({
                title: '密码设置错误', icon: 'error', duration: 2000
            })
        }
    }, headerLoadFail() {
        this.setData({
            defaultUrl: PicCDNUtils.getPicUrl("pic_user.png")
        })
    }
});
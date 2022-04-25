import {PicCDNUtils} from "../api/net/PicCDNUtils";
import {SigninSmsInput, SigninWxInput, SmsValidInput, User, ValidAction, WxJsApiTarget} from "../api/net/gql/graphql";
import {StorageUtils} from "../api/utils/StorageUtils";
import {AppConstant} from "../api/AppConstant";
import {request} from "../api/Api";
import {WXUtils} from "../api/utils/WXUtils";

const NULL: any = null;

Page({
    data: {
        backArrowUrl: PicCDNUtils.getPicUrl("btn_back.png"),
        girlUrl: PicCDNUtils.getPicUrl("pic_logo.png"),
        loginBtnStyle: "",
        name: "",
        pwd: "",
        phoneModalInput: NULL,
        // 0 不能获取验证码
        // 1 可以点击获取
        // 2 冷却时间
        yanzhengmaStatus: 0,
        timeLeft: 60,
        wechatIcon: PicCDNUtils.getPicUrl("btn_wechat.png", false),
        // 0 短信登录
        // 1 微信登录
        loginStatus: 1
    },

    canSubmit(): boolean {
        return this.data.name != "" && this.data.pwd != "";
    },

    nameInput(e: any) {
        this.setData({
            name: e.detail.value
        })
        this.whenInput();
    },

    pwdInput(e: any) {
        this.setData({
            pwd: e.detail.value
        })
        this.whenInput();
    },

    async registerWithPhone() {
        wx.navigateTo({
            url: '/pages/PhoneRegWithPhone',
        })
    },

    changeToWeixinLogin() {
        if (this.data.yanzhengmaStatus != 2) {
            this.setData({
                loginStatus: 1
            })
        }
    },

    whenInput(): void {
        if (this.data.name != "" && this.data.yanzhengmaStatus != 2) {
            this.setData({
                yanzhengmaStatus: 1
            })
        }
        if (this.data.name == "" && this.data.yanzhengmaStatus != 2) {
            this.setData({
                yanzhengmaStatus: 0
            })
        }

        if (this.canSubmit()) {
            this.setData({
                'loginBtnStyle': "background: #FDD3A1; color: #111111; opacity: 1;"
            })
        } else {
            this.setData({
                'loginBtnStyle': ""
            })
        }
    },

    async duanxinyanzhengma() {
        const input: SmsValidInput = {action: ValidAction.Signin, phoneNumber: this.data.name}
        const res = await request.smsRequestVerificationCode({input: input});
        const that = this;
        if (res != null && res == true) {
            let timeleft = 60;
            this.setData({
                yanzhengmaStatus: 2
            })
            const downloadTimer = setInterval(() => {
                if (timeleft <= 0) {
                    // finish
                    clearInterval(downloadTimer);
                    if (that.data.name != "") {
                        this.setData({
                            yanzhengmaStatus: 1
                        })
                    }
                    if (that.data.name == "") {
                        this.setData({
                            yanzhengmaStatus: 0
                        })
                    }
                } else {
                    // not finish
                    that.setData({
                        timeLeft: timeleft
                    })
                }
                timeleft -= 1;
            }, 1000);
        } else {
            wx.showToast({
                title: '出错', icon: 'error', duration: 2000
            })
        }
    },

    async clickLogin() {
        if (this.data.loginStatus == 0) {
            const input: SigninSmsInput = {phoneNumber: this.data.name, verificationCode: this.data.pwd};
            const res = await request.signinSms({input: input});
            if (res != null) {
                let userDetail: User = await request.user({userId: res.id})
                if (userDetail == null) {
                    await wx.showModal({
                        title: '提示', content: '获取用户信息出错，请联系管理员！', showCancel: false
                    })
                    return;
                }
                StorageUtils.setStorage(AppConstant.TOKEN, res.token);
                StorageUtils.setStorage(AppConstant.USER, userDetail);
                await wx.reLaunch({
                    url: '/pages/PhoneApp',
                })
            }
        } else {
            const login = await WXUtils.login();
            const wxCode = login.code.toString();
            if (wxCode) {
                const wxJsapiOpenId = await request.wxJsapiOpenId({code: wxCode, target: WxJsApiTarget.MiniProgram});
                if (wxJsapiOpenId && wxJsapiOpenId.response.openid) {
                    const input: SigninWxInput = {
                        openId: wxJsapiOpenId.response.openid,
                        phoneNumber: this.data.name,
                        verificationCode: this.data.pwd
                    };
                    const res = await request.signinWx({input: input});
                    if (res != null) {
                        let userDetail: User = await request.user({userId: res.id})
                        if (userDetail == null) {
                            await wx.showModal({
                                title: '提示', content: '获取用户信息出错，请联系管理员！', showCancel: false
                            })
                            return;
                        }
                        StorageUtils.setStorage(AppConstant.TOKEN, res.token);
                        StorageUtils.setStorage(AppConstant.USER, userDetail);
                        await wx.reLaunch({
                            url: '/pages/PhoneApp',
                        })
                    } else {
                        await wx.showModal({
                            title: '提示', content: '验证码错误，请确认验证码正确', showCancel: false
                        })
                    }
                }
            }
        }
    },

    onLoad() {
        this.setData({
            'phoneModalInput': this.selectComponent("#phoneModalInput")
        });
    }
});
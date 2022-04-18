import {PicCDNUtils} from "../api/net/PicCDNUtils";
import {
    SigninSmsInput,
    SigninWxInput,
    SmsValidInput,
    UserDetail,
    ValidAction,
    WxJsApiTarget
} from "../api/net/gql/graphql";
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

    async register() {
        const passwords: any = await this.data.phoneModalInput.show({
            inputPlaceholder: ["账号", "密码", "确认密码"],
            submitContent: "确定",
            title: "注册",
            defaultValue: ["", "", ""],
            isPwd: [false, true, true]
        });
        if (passwords === null) return;
        await wx.showLoading({title: "加载中..."})
        const canSubmit = (passwords: Array<string>) => {
            return passwords[1] != "" && passwords[2] != "" && passwords[1] == passwords[2] && passwords[0] != "";
        }
        if (canSubmit(passwords)) {
            const signup = await request.signup({
                input: {
                    username: passwords[0], password: passwords[1]
                }
            })
            if (signup == null) {
                await wx.hideLoading()
                wx.showModal({
                    title: '错误', content: 'signup fail', showCancel: false, success(res) {
                        if (res.confirm) {
                        } else if (res.cancel) {
                        }
                    }
                })
            } else {
                await wx.hideLoading()
                await wx.showModal({
                    title: '提示', content: '注册成功', showCancel: false
                })
                // 自动登录
                this.setData({
                    name: passwords[0],
                    pwd: passwords[1]
                })
                this.clickLogin();
            }
        } else {
            await wx.hideLoading()
            await wx.showModal({
                title: '提示', content: '账号密码设置错误', showCancel: false
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
        //////////////console.log(res)
        if (res != null && res == true) {
            let timeleft = 60;
            //////////////console.log("here")
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

    async getPhoneNumber(e) {
        ////////////////console.log(e.detail.code)
    },

    async clickLogin() {
        //////////////console.log(this.data.loginStatus)
        if (this.data.loginStatus == 0) {
            const input: SigninSmsInput = {phoneNumber: this.data.name, verificationCode: this.data.pwd};
            const res = await request.signinSms({input: input});
            //////////////console.log(res)
            if (res != null) {
                let userDetail: UserDetail = await request.user({userId: res.id})
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
            //////////////console.log(wxCode)
            if (wxCode) {
                const wxJsapiOpenId = await request.wxJsapiOpenId({code: wxCode, target: WxJsApiTarget.MiniProgram});
                //////////////console.log(wxJsapiOpenId)
                if (wxJsapiOpenId && wxJsapiOpenId.response.openid) {
                    const input: SigninWxInput = {
                        openId: wxJsapiOpenId.response.openid,
                        phoneNumber: this.data.name,
                        verificationCode: this.data.pwd
                    };
                    const res = await request.signinWx({input: input});
                    //////////////console.log(res);
                    if (res != null) {
                        let userDetail: UserDetail = await request.user({userId: res.id})
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
import {PicCDNUtils} from "../api/net/PicCDNUtils";
import {LoginInfo, UserDetail} from "../api/net/gql/graphql";
import {UserSet} from "../api/storage/UserSet";
import {StorageUtils} from "../api/utils/StorageUtils";
import {AppConstant} from "../api/AppConstant";
import {request} from "../api/Api";

const NULL: any = null;

Page({
    data: {
        backArrowUrl: PicCDNUtils.getPicUrl("btn_back.png"),
        girlUrl: PicCDNUtils.getPicUrl("pic_logo.png"),
        loginBtnStyle: "",
        name: "",
        pwd: "",
        phoneModalInput: NULL,
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

    async register() {
        const passwords: any = await this.data.phoneModalInput.show({
            inputPlaceholder: ["账号", "密码", "确认密码"],
            submitContent: "确定",
            title: "注册",
            defaultValue: ["", "", ""],
            isPwd: [false, true, true]
        });
        if (passwords === null) return;
        await wx.showLoading({title: ""})
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

    async clickLogin() {
        if (!this.canSubmit()) return;
        let loginInfo: LoginInfo = await request.signin({username: this.data.name, userpass: this.data.pwd});
        if (loginInfo == null) {
            await wx.showModal({
                title: '提示', content: '密码有误，请确认后重新输入', showCancel: false
            })
            return;
        }
        let userDetail: UserDetail = await request.user({userId: loginInfo.id})
        if (userDetail == null) {
            await wx.showModal({
                title: '提示', content: '获取用户信息出错，请联系管理员！', showCancel: false
            })
            return;
        }
        UserSet.setToken(loginInfo.token);
        StorageUtils.setStorage(AppConstant.LOGIN_KEY, loginInfo);
        UserSet.setUserInfo(userDetail);
        await wx.reLaunch({
            url: '/pages/PhoneApp',
        })
    },

    onLoad() {
        this.setData({
            'phoneModalInput': this.selectComponent("#phoneModalInput")
        });
    }
});
import {request} from "../api/Api";

const NULL: any = null;

Page({
    data: {
        pwd: "",
        pwdConf: "",
        submitBtnStyle: "",
        modalTips: NULL,
    },
    canSubmit(): boolean {
        return this.data.pwd != "" && this.data.pwdConf != "" && this.data.pwd == this.data.pwdConf;
    },
    async changePwd() {
        if (this.canSubmit()) {
            const userUpdatePassword = await request.userUpdatePassword({newPassword: this.data.pwd});
            if (userUpdatePassword === null) {
                wx.showToast({
                    title: '出错了',
                    icon: 'error',
                    duration: 2000
                })
                return;
            }
            wx.showToast({
                title: '已修改成功',
                icon: 'error',
                duration: 2000
            })
        }
    },
    whenInput(): void {
        if (this.canSubmit()) {
            this.setData({
                'submitBtnStyle': "background: #FDD3A1; color: #111111; opacity: 1;"
            })
        } else {
            this.setData({
                'submitBtnStyle': ""
            })
        }
    }
});
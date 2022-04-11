import {request} from "../Api";
import {UserDetail, WxJsApiTarget} from "../net/gql/graphql";
import {StorageUtils} from "./StorageUtils";
import {AppConstant} from "../AppConstant";

export class PayResult {
    public success: boolean = false;
    public res: any;
}

export class WXUtils {

    public static async gotoLogin() {
        const login = await WXUtils.login();
        const wxCode = login.code.toString();
        if (wxCode) {
            const wxJsapiOpenId = await request.wxJsapiOpenId({code: wxCode, target: WxJsApiTarget.MiniProgram});
            //console.log(wxJsapiOpenId)
            if (wxJsapiOpenId == null || wxJsapiOpenId == undefined || wxJsapiOpenId.signin_info == null) {
                wx.reLaunch({
                    url: '/pages/PhoneLoginNew',
                })
                return null;
            } else {
                let userDetail: UserDetail = await request.user({userId: wxJsapiOpenId.signin_info.id})
                if (userDetail == null) {
                    await wx.showModal({
                        title: '提示', content: '获取用户信息出错，请联系管理员！', showCancel: false
                    })
                    return null;
                }
                StorageUtils.setStorage(AppConstant.TOKEN, wxJsapiOpenId.signin_info.token);
                StorageUtils.setStorage(AppConstant.USER, userDetail);
                return userDetail
            }
        } else {
            wx.reLaunch({
                url: '/pages/PhoneLoginNew',
            })
            return null;
        }
    }

    public static getScreenHeight() {
        return wx.getSystemInfoSync().screenHeight;
    }

    public static getStatusBarHeight() {
        return wx.getSystemInfoSync().statusBarHeight;
    }

    public static async getRect(id: string): Promise<any> {
        return new Promise((resolve) => {
            const query = wx.createSelectorQuery();
            query.select(id).boundingClientRect();
            query.exec(function (res) {
                resolve(res);
            })
        });
    }

    public static async getRect2(id: string, thiz: any): Promise<any> {
        return new Promise((resolve) => {
            const query = wx.createSelectorQuery().in(thiz)
            query.select(id).boundingClientRect()
            query.exec(function (res) {
                resolve(res);
            })
        });
    }

    public static async login(): Promise<any> {
        return new Promise((resolve) => {
            wx.login({
                success(res) {
                    resolve(res);
                }
            });
        });
    }

    public static async chooseImage(): Promise<any> {
        return new Promise((resolve) => {
            wx.chooseImage({
                count: 1, sizeType: ['original', 'compressed'], sourceType: ['album', 'camera'], success(res) {
                    resolve(res);
                }, fail() {
                    resolve(null);
                }
            });
        });
    }

    public static async pay(params: any): Promise<PayResult> {
        return new Promise((resolve) => {
            wx.requestPayment({
                "timeStamp": params.timeStamp,
                "nonceStr": params.nonceStr,
                "package": params.package,
                "signType": params.signType,
                "paySign": params.paySign,
                "success": function (res) {
                    const result: PayResult = new PayResult();
                    result.res = res;
                    result.success = true;
                    resolve(result);
                },
                "fail": function (res) {
                    const result: PayResult = new PayResult();
                    result.res = res;
                    result.success = false;
                    resolve(result);
                }
            })
        });
    }
}
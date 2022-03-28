export class PayResult {
    public success: boolean = false;
    public res: any;
}

export class WXUtils {

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
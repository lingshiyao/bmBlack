import {PublicUtils} from "../../api/utils/PublicUtils";
import {request} from "../../api/Api";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";
import {Order, WxJsApiTarget} from "../../api/net/gql/graphql";
import {Utils} from "../../api/utils/Utils";
import {WXUtils} from "../../api/utils/WXUtils";

Component({
    data: {
        getColor: "width: 15.6vw;",
        id: "phone_order_item_img",
        orderStatus: "",
        name: "",
        src: "",
        date: "",
    },
    methods: {
        async goToPay() {
            wx.showModal(
                {
                    title: '提示', content: "小程序暂不支持购买，请用浏览器访问wu-jie.art", showCancel: false, success(res) {
                        if (res.confirm) {
                        } else if (res.cancel) {
                        }
                    }
                }
            )
            return;
            if (this.properties.order.tradeType === "WX_NATIVE") {
                const wxNativeCodeUrl = await request.wxNativeCodeUrl({orderId: this.properties.order.id.toString()})
                if (wxNativeCodeUrl) {
                    wx.navigateTo({
                        url: `/pages/PhonePayPage?id=${this.properties.order.art.id}&m=${this.properties.order.art.mintPrice}&order=${this.properties.order.id}&type="WX_NATIVE"`
                    })
                } else {
                }
            } else {
                if (PublicUtils.isWeChat()) {
                    await wx.showLoading({title: "加载中..."})
                    const wxJsapiPayParams = await request.wxJsapiPayParams({
                        prepayId: this.properties.order.tradeReturn.prepay_id.toString(),
                        target: WxJsApiTarget.MiniProgram
                    })
                    const pay = await WXUtils.pay(wxJsapiPayParams);
                    await wx.hideLoading()
                    if (pay.success) {
                        wx.showToast({
                            title: '支付完成！',
                            icon: 'error',
                            duration: 2000
                        })
                    } else {
                        await wx.showModal({
                            title: '提示', content: `支付失败：${JSON.stringify(pay.res)}`, showCancel: false
                        })
                    }
                } else {
                    wx.showToast({
                        title: '该订单支持微信支付！',
                        icon: 'error',
                        duration: 2000
                    })
                }
            }
        }, goToInfo() {
            wx.navigateTo({
                url: `/pages/PhoneInfoPage?id=${this.properties.order.arts[0].id}&sid=${this.properties.order.store.id}&isFromOrder=${this.properties.isFromOrder}`
            })
        }, getOrderStatus(tradeState: string) {
            switch (tradeState) {
                case "WAIT_FOR_PAYMENT_NOT_PAY":
                    let getColor_2996075e: any = this.data.getColor;
                    getColor_2996075e = "color: #692D0B; background:#FDD3A1;";
                    this.setData({
                        'getColor': getColor_2996075e
                    });
                    return "未支付";
                case "WAIT_FOR_PAYMENT_USER_PAYING":
                    let getColor_fb249e71: any = this.data.getColor;
                    getColor_fb249e71 = "color: #692D0B; background:#FDD3A1;";
                    this.setData({
                        'getColor': getColor_fb249e71
                    });
                    return "支付中";
                case "WAIT_FOR_PAYMENT_PAY_ERROR":
                    let getColor_88f6d49c: any = this.data.getColor;
                    getColor_88f6d49c = "color: red; background:#353535;";
                    this.setData({
                        'getColor': getColor_88f6d49c
                    });
                    return "支付失败";
                case "WAIT_FOR_TRANSACTION_NONE":
                    let getColor_b9335954: any = this.data.getColor;
                    getColor_b9335954 = "color: blue; background:#353535;";
                    this.setData({
                        'getColor': getColor_b9335954
                    });
                    return "等待上链";
                case "WAIT_FOR_TRANSACTION_PENDING":
                    let getColor_c57888e8: any = this.data.getColor;
                    getColor_c57888e8 = "color: blue; background:#353535;";
                    this.setData({
                        'getColor': getColor_c57888e8
                    });
                    return "上链中";
                case "WAIT_FOR_TRANSACTION_FAILED":
                    let getColor_58fc78ec: any = this.data.getColor;
                    getColor_58fc78ec = "color: red; background:#353535;";
                    this.setData({
                        'getColor': getColor_58fc78ec
                    });
                    return "上链失败";
                case "SUCCESS":
                    let getColor_9b26cfd6: any = this.data.getColor;
                    getColor_9b26cfd6 = "color: #FDD3A1; background:#353535;";
                    this.setData({
                        'getColor': getColor_9b26cfd6
                    });
                    return "已成功";
                case "CLOSED":
                    let getColor_b93202f5: any = this.data.getColor;
                    getColor_b93202f5 = "color: #535353; background:#353535;";
                    this.setData({
                        'getColor': getColor_b93202f5
                    });
                    return "订单关闭";
                case "REFUND_PROCESSING":
                    let getColor_2f617461: any = this.data.getColor;
                    getColor_2f617461 = "color: blue; background:#353535;";
                    this.setData({
                        'getColor': getColor_2f617461
                    });
                    return "退款处理中";
                case "REFUND_SUCCESS":
                    let getColor_23564f4f: any = this.data.getColor;
                    getColor_23564f4f = "color: blue; background:#353535;";
                    this.setData({
                        'getColor': getColor_23564f4f
                    });
                    return "退款成功";
                case "REFUND_CLOSED":
                    let getColor_0a690e5c: any = this.data.getColor;
                    getColor_0a690e5c = "color: #535353; background:#353535;";
                    this.setData({
                        'getColor': getColor_0a690e5c
                    });
                    return "退款关闭";
                case "REFUND_ABNORMAL":
                    let getColor_ad01aacc: any = this.data.getColor;
                    getColor_ad01aacc = "color: red; background:#353535;";
                    this.setData({
                        'getColor': getColor_ad01aacc
                    });
                    return "退款异常";
                case "UNKNOWN":
                    let getColor_0400ee74: any = this.data.getColor;
                    getColor_0400ee74 = "color: red; background:#353535;";
                    this.setData({
                        'getColor': getColor_0400ee74
                    });
                    return "未知错误";
                default:
                    let getColor_15cab551: any = this.data.getColor;
                    getColor_15cab551 = "color: red; background:#353535;";
                    this.setData({
                        'getColor': getColor_15cab551
                    });
                    return "状态";
            }
        }
    }, properties: {
        order: Object,
        isFromOrder: {
            type: Boolean,
            value: false
        }
    }, ready() {
        let id_a4f5b896: any = this.data.id;
        id_a4f5b896 = `phone_order_item_img${PublicUtils.generateUUID()}`;
        this.setData({
            'id': id_a4f5b896
        });
    }, observers: {
        'order': function (data: Order) {
            this.setData({
                orderStatus: this.getOrderStatus(data.state)
            })
            if (!data.store.isBlind) {
                this.setData({
                    name: data.arts[0].name
                })
            } else {
                this.setData({
                    name: data.arts[0].stores[0].name + " 盲盒"
                })
            }

            if (data.arts[0].kind == "MODEL") {
                this.setData({
                    'src': ImgPathUtils.getJpg(data.arts[0].id)
                })
            } else {
                this.setData({
                    'src': ImgPathUtils.getMedia(data.arts[0].id)
                })
            }
            this.setData({
                'date': Utils.formatDate(new Date(data.createdAt), "yyyy-MM-dd HH:mm:ss")
            })
        }
    }
});
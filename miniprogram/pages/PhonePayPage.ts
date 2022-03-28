/*
import QrcodeVue from ;
*/

import {request} from "../api/Api";

const NULL: any = null;

Page({
    data: {
        qrCodeIDString: "",
        orderString: "",
        moneyString: "",
        timeOut: NULL,
        options: NULL
    },
    sureAction() {
        // FIXME
        // const url = Config.LOCATION + "/#/phone/home?id=3";
        // window.open(url, "_self");
    }, async mintArts() {
        const wxNativeCodeUrl = await request.wxNativeCodeUrl({orderId: this.data.orderString});
        if (wxNativeCodeUrl) {
            let qrCodeIDString_0f46c53d: any = this.data.qrCodeIDString;
            qrCodeIDString_0f46c53d = wxNativeCodeUrl.tradeReturn.code_url;
            this.setData({
                'qrCodeIDString': qrCodeIDString_0f46c53d
            });
        } else {
            wx.showToast({
                title: '二维码获取失败，请刷新页面重试！',
                icon: 'error',
                duration: 2000
            })
        }
    },
    ready() {
        let qrCodeIDString_3ab1a7d7: any = this.data.qrCodeIDString;
        qrCodeIDString_3ab1a7d7 = this.data.options.id.toString();
        this.setData({
            'qrCodeIDString': qrCodeIDString_3ab1a7d7
        });
        let orderString_6bd9f9bf: any = this.data.orderString;
        orderString_6bd9f9bf = this.data.options.order.toString();

        this.setData({
            'orderString': orderString_6bd9f9bf
        });
        let moneyString_b7701e10: any = this.data.moneyString;
        moneyString_b7701e10 = this.data.options.m.toString();
        this.setData({
            'moneyString': moneyString_b7701e10
        });
        let fn = () => {
            this.mintArts();
            clearTimeout(this.data.timeOut);
            let timeOut_4bb81245: any = this.data.timeOut;
            timeOut_4bb81245 = setTimeout(fn, 60000);
            this.setData({
                'timeOut': timeOut_4bb81245
            });
        };
        fn();
    },
    observers: {},
    onLoad(options) {
        this.setData({
            'options': options
        })
    },
    onUnload() {
        clearTimeout(this.data.timeOut);
    }
});
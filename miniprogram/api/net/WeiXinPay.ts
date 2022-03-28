export function weiXinPayInit() {
    // FIXME
    // if(!WeiXinApi.isInWeixin()) return;
    // if (typeof WeixinJSBridge == "undefined") {
    //     if (document.addEventListener) {
    //         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    //     } else if (document.attachEvent) {
    //         document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
    //         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    //     }
    // } else {
    //     const pay = (appId, timeStamp, nonceStr, _package, signType, paySign, resFunction) => {
    //         WeixinJSBridge.invoke('getBrandWCPayRequest', {
    //             "appId": appId,     //公众号ID，由商户传入
    //             "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数
    //             "nonceStr": nonceStr, //随机串
    //             "package": _package,
    //             "signType": signType,         //微信签名方式：
    //             "paySign": paySign //微信签名
    //         }, function (res) {
    //             resFunction(res)
    //         });
    //     }
    //     window.___weixinPay = pay;
    // }
}
import {CollectCardDataEntity} from "../../api/entity/Collect/CollectItemsListItemEntity";
import {CollectBannerEntity} from "../../api/entity/Collect/CollectBannerEntity";
import {Utils} from "../../api/utils/Utils";

const NULL: any = null;

Component({
    properties: {
        data: {
            type: Array, value: new Array<CollectCardDataEntity>(),
        }, bannerData: {
            type: Object, value: new CollectBannerEntity()
        }, store: Object
    }, data: {
        phoneModelPay: NULL,
        buyStatus: 0,
        theSale: NULL,
        address: "cfxtest:acdk7r6rzc1u9yr039mf3t1hsk1r4km4rekdzc7m4b",
        safeArea: "",
        price: 0.00
    }, methods: {
        initSafeArea() {
            this.setData({
                safeArea: `padding-bottom:${Utils.getBottomSafeAreaPxHeight()}px`
            })
        }, copyAddressText() {
            wx.setClipboardData({
                data: this.data.address, success: function () {
                    wx.getClipboardData({
                        success: function () {
                            wx.showToast({
                                title: '复制成功'
                            })
                        }
                    })
                }
            })
        }, async getBlind() {
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
            const result = await this.data.phoneModelPay.show(this.properties.data[0].price.toString());
            if (result != null) {
                this.triggerEvent('getBlind', result);
            }
        }
    }, observers: {
        'data': function (data: Array<CollectCardDataEntity>) {
            this.setData({
                price: parseFloat(data[0].price.toString())
            })
        }, 'store': function (store: any) {
            if (new Date(store.openingTime).getTime() - new Date().getTime() > 0) {
                this.setData({
                    theSale: Utils.formatDate(new Date(store.openingTime), "MM-dd HH:mm")
                })
                Utils.formatDate(new Date(store.openingTime), "MM-dd HH:mm")
                // 即将开售
                this.setData({
                    buyStatus: 1
                })
            } else {
                if (store.totalSupply - 0 > 0) {
                    this.setData({
                        buyStatus: 0
                    })
                } else {
                    this.setData({
                        buyStatus: 2
                    })
                }
            }
        }
    }, ready() {
        this.setData({
            phoneModelPay: this.selectComponent("#phoneModelPay"),
        })
        this.initSafeArea();
    }
});

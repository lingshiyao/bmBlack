import {CollectCardDataEntity} from "../../api/entity/Collect/CollectItemsListItemEntity";
import {CollectBannerEntity} from "../../api/entity/Collect/CollectBannerEntity";
import {Utils} from "../../api/utils/Utils";

const NULL: any = null;

Component({
    properties: {
        data: {
            type: Array,
            value: new Array<CollectCardDataEntity>(),
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
            //console.log(this.data.safeArea)
        },
        copyAddressText() {
            wx.setClipboardData({
                data: this.data.address,
                success: function (res) {
                    wx.getClipboardData({
                        success: function (res) {
                            wx.showToast({
                                title: '复制成功'
                            })
                        }
                    })
                }
            })
        },
        async getBlind() {
            const result = await this.data.phoneModelPay.show(this.properties.data[0].price.toString());
            if (result != null) {
                this.triggerEvent('getBlind', result);
            }
        }
    }, observers: {
        'data': function (data: Array<CollectCardDataEntity>) {
            ////////////////////////console.log(data)
            this.setData({
                price: parseFloat(data[0].price.toString())
            })
            //////////////////////////////console.log(data)
        }, 'bannerData': function (bannerData: CollectBannerEntity) {
            ////////////////////////console.log(bannerData)
            //////////////////////////////console.log(bannerData)
        }, 'store': function (store: any) {
            ////////////////////////console.log(store)
            //////////////////////////////console.log(store)
            if (new Date(store.openingTime).getTime() - new Date().getTime() > 0) {
                // ////////////////////////////////console.log("// 即将开售")
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
                    // ////////////////////////////////console.log("// 立即购买")
                    this.setData({
                        buyStatus: 0
                    })
                } else {
                    // ////////////////////////////////console.log("// 已售罄")
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
        //
    }
});

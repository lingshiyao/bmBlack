import {CollectBannerEntity} from "../api/entity/Collect/CollectBannerEntity";
import {CollectCardDataEntity} from "../api/entity/Collect/CollectItemsListItemEntity";
import {PublicUtils} from "../api/utils/PublicUtils";
import {UserSet} from "../api/storage/UserSet";
import {request} from "../api/Api";
import {ImgPathUtils} from "../api/utils/ImgPathUtils";
import {weiXinPayInit} from "../api/net/WeiXinPay";
import {TradeType} from "../api/net/gql/graphql";
import {WXUtils} from "../api/utils/WXUtils";

/////
var openId: string | null = null;

const NULL: any = null;

Page({
    data: {
        phoneModalLoading: NULL,
        phoneModalTips: NULL,
        num: 1,
        price: 0,
        pageIndex: 0,
        bannerData: new CollectBannerEntity(),
        collectData: new Array<CollectCardDataEntity>(),
        total: 0,
        options: NULL
    }, async initOpenId() {
        // FIXME
        // const wxCode = WxPay.getWxCode(window.location.href);
        const login = await WXUtils.login();
        const wxCode = login.code.toString();
        if (wxCode) {
            const wxJsapiOpenId = await request.wxJsapiOpenId2({code: wxCode});
            if (wxJsapiOpenId) {
                openId = wxJsapiOpenId.openid;
            } else {
                wx.showToast({
                    title: '出错', icon: 'error', duration: 2000
                })
            }
        }
    }, goToPage(path: string, id?: string, storeId?: string) {
        const l_path = `/${path}`;
        if (id) {
            if (storeId) {
                wx.navigateTo({
                    url: `${l_path}?id=${id}&sid=${storeId}`,
                })
            } else {
                wx.navigateTo({
                    url: `${l_path}?id=${id}`,
                })
            }
        } else {
            wx.navigateTo({
                url: `${l_path}`,
            })
        }
    }, getPage(index: string) {
        this.getStoreArts("", Number(index) - 1);
    }, async getStoreInfo() {
        const storeId = this.data.options.id;
        const store = await request.store({storeId: <string>storeId});
        if (store) {
            let bannerData_598de07a: any = this.data.bannerData;
            bannerData_598de07a.introduction = store.description;
            this.setData({
                'bannerData': bannerData_598de07a
            });
            let bannerData_1032d5cf: any = this.data.bannerData;
            bannerData_1032d5cf.projectName = store.name;
            this.setData({
                'bannerData': bannerData_1032d5cf
            });
            let bannerData_95e2f2c5: any = this.data.bannerData;
            bannerData_95e2f2c5.projectAuthor = store.user.user.username;
            this.setData({
                'bannerData': bannerData_95e2f2c5
            });
            let bannerData_11331145: any = this.data.bannerData;

            // FIXME
            // bannerData_11331145.projectTime = dateFormat(store.updatedAt, "yyyy-mm-dd HH:MM:ss");
            bannerData_11331145.projectTime = store.updatedAt.toString();
            this.setData({
                'bannerData': bannerData_11331145
            });
            let bannerData_2482fee2: any = this.data.bannerData;
            bannerData_2482fee2.uid = store.user.user.id;
            this.setData({
                'bannerData': bannerData_2482fee2
            });
            let bannerData_dea64610: any = this.data.bannerData;
            bannerData_dea64610.url = store.externalLink;
            this.setData({
                'bannerData': bannerData_dea64610
            });
            let bannerData_4d40f2b8: any = this.data.bannerData;
            bannerData_4d40f2b8.isBlind = store.isBlind;
            this.setData({
                'bannerData': bannerData_4d40f2b8
            });

            if (this.data.bannerData.isBlind === true) {
                await this.initOpenId();
                await weiXinPayInit();
            }
            let bannerData_0863b993: any = this.data.bannerData;
            bannerData_0863b993.headerImg = ImgPathUtils.getSIcon(store.id);
            this.setData({
                'bannerData': bannerData_0863b993
            });
            let bannerData_7541faab: any = this.data.bannerData;
            bannerData_7541faab.banner = ImgPathUtils.getSBanner(store.id);
            this.setData({
                'bannerData': bannerData_7541faab
            });
        } else {
            wx.showToast({
                title: '出错了', icon: 'error', duration: 2000
            })
            // PublicUtils.alertView.showAlertView(res.error);
        }
    }, async getStoreStat() {
        const storeId = this.data.options.id;
        const storeStat = await request.storeStat({storeId: storeId.toString()});
        if (storeStat) {
            let bannerData_a9b64f56: any = this.data.bannerData;
            bannerData_a9b64f56.contents[0].num = storeStat.items;
            this.setData({
                'bannerData': bannerData_a9b64f56
            });
            let bannerData_b2ac74e2: any = this.data.bannerData;
            bannerData_b2ac74e2.contents[1].num = storeStat.owners;
            this.setData({
                'bannerData': bannerData_b2ac74e2
            });
            let bannerData_72685846: any = this.data.bannerData;
            bannerData_72685846.contents[2].num = storeStat.soldVolume;
            this.setData({
                'bannerData': bannerData_72685846
            });
            let bannerData_92d167d1: any = this.data.bannerData;
            bannerData_92d167d1.contents[3].num = storeStat.soldAmount;
            this.setData({
                'bannerData': bannerData_92d167d1
            });
        }
    }, getStoreArts: async function (key: string, pageIndex: number) {
        const storeId = this.data.options.id;
        var ascByPrice = false;
        if (key === "false" || key === "true") {
            if (key === "true") {
                ascByPrice = true;
            } else {
                ascByPrice = false;
            }
            key = "";
        }
        const arts = await request.arts({
            ascByPrice: ascByPrice, key: key, pageIndex: pageIndex, pageSize: 1000, storeId: storeId
        })
        let collectData_7f6f2d2e: any = this.data.collectData;
        collectData_7f6f2d2e = [];
        this.setData({
            'collectData': collectData_7f6f2d2e
        });
        if (arts) {
            for (let index = 0; index < arts.list.length; index++) {
                const val = new CollectCardDataEntity();
                val.name = arts.list[index].name;
                if (val.name.length > 8) {
                    val.name = val.name.substring(0, 8) + "...";
                }
                val.author = arts.list[index].stores[0].name;
                val.category = arts.list[index].stores[0].category.name;
                if (arts.list[index].supplied >= arts.list[index].maxSupply) val.isShowSupple = true;
                val.supple = arts.list[index].maxSupply;
                val.id = arts.list[index].id;
                val.price = arts.list[index].mintPrice;
                val.like = arts.list[index].favCount.toString();
                val.headerImg = ImgPathUtils.getMedia(arts.list[index].id);
                console.log(val.price)
                // FIXME
                // if (!openId && Number.parseFloat(val.price) > 0 && (val.supple - arts.list[index].supplied > 0) && this.data.bannerData.isBlind && PublicUtils.isWeChat()) {
                //     // const storeId = <string>this.data.options.id;
                //     // location.href = WeiXinApi.getAuthorizeBlindPath({storeId});
                //     return;
                // }
                let collectData_2832eca4: any = this.data.collectData;
                collectData_2832eca4.push(val);
                this.setData({
                    'collectData': collectData_2832eca4
                });
                // if (index === 0) {
                    this.setData({
                        'num': 1
                    });
                // }
            }
            console.log(arts)
            let total_6b082abf: any = this.data.total;
            total_6b082abf = arts.total;
            this.setData({
                'total': total_6b082abf
            });
        } else {
            wx.showToast({
                title: '出错了', icon: 'error', duration: 2000
            })
        }
    }, searchAction(event: any) {
        const searchKey = event.detail;
        this.getStoreArts(searchKey, this.data.pageIndex);
    }, goToInfo(event: any) {
        const index = event.detail;
        this.goToPage("pages/PhoneInfoPage", this.data.collectData[index].id, <string>this.data.options.id);
    }, getNumber(event: any) {
        const n = parseInt(event.detail.toString());
        // let num_976bd9db: any = this.data.num;
        // num_976bd9db = Math.floor(parseFloat(this.data.collectData[0].price) * n * 100) / 100;
        this.setData({
            'num': n
        });
        this.setData({
            'price': this.data.collectData[0].price
        })
    }, getBlind() {
        this.mintArts();
    }, async mintArts() {
        if (UserSet.getToken() === null) {
            PublicUtils.ifGotoLogin();
            return;
        }
        const storeId = <string>this.data.options.id;
        var openID = openId;
        if (Number.parseFloat(this.data.collectData[0].price) <= 0) {
            openID = "";
        }
        await wx.showLoading({title: ""})

        const mintBlind = await request.mintBlind({
            count: this.data.num,
            openId: openID!,
            storeId: storeId,
            tradeType: TradeType.WxMiniProgram
        }, true)
        if (mintBlind) {
            if (!mintBlind.needPay) {
                this.goToPage("phone/home", "3");
            } else {
                if (!PublicUtils.isWeChat()) {
                    await wx.hideLoading()
                    wx.navigateTo({
                        url: `/pages/PhonePayPage?id=${mintBlind.tradeReturn.code_url}&m=${mintBlind.price * this.data.num}&order=${mintBlind.orderId}`
                    })
                    return;
                }
                await wx.showLoading({title: ""})
                const wxJsapiPayParams = await request.wxJsapiPayParams2({prepayId: mintBlind.tradeReturn.prepay_id});
                const pay = await WXUtils.pay(wxJsapiPayParams);
                await wx.hideLoading();
                if (pay.success) {
                    wx.showToast({
                        title: '支付完成！', icon: 'error', duration: 2000
                    })
                } else {
                    await wx.showModal({
                        title: '提示', content: `支付失败：${JSON.stringify(pay.res)}`, showCancel: false
                    })
                }
                // FIXME
                // const wxJsapiPayParams = await request.wxJsapiPayParams({prepayId: mintBlind.tradeReturn.prepay_id});
                // const _window: any = window;
                // await _window.___weixinPay(wxJsapiPayParams.appId, wxJsapiPayParams.timeStamp, wxJsapiPayParams.nonceStr.toString(), wxJsapiPayParams.package, wxJsapiPayParams.signType, wxJsapiPayParams.paySign, function (r: any) {
                //     if (r.err_msg == "get_brand_wcpay_request:ok") {
                //         goToPage("phone/home", "3");
                //     }
                // });
                await wx.hideLoading()
            }
        } else {
            await wx.hideLoading()
            wx.showToast({
                title: '出错了', icon: 'error', duration: 2000
            })
        }
    }, async shareAction() {
    }, async init() {
        await this.getStoreInfo();
        await this.getStoreStat();
        await this.getStoreArts("", this.data.pageIndex);
    }, properties: {}, onLoad(options) {
        this.setData({
            'options': options
        })
        this.init();
    }, observers: {}
});
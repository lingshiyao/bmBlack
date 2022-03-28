import {request} from "../api/Api";
import {InfoHeaderEntity} from "../api/entity/Info/InfoHeaderEntity";
import {UserSet} from "../api/storage/UserSet";
import {PublicUtils} from "../api/utils/PublicUtils";
import {TradeType} from "../api/net/gql/graphql";
import {ImgPathUtils} from "../api/utils/ImgPathUtils";
import {weiXinPayInit} from "../api/net/WeiXinPay";
import {WXUtils} from "../api/utils/WXUtils";

var openId: string | null = null;
const NULL: any = null;

Page({
    data: {
        phoneModalLoading: NULL,
        phoneModalTips: NULL,
        nft: new InfoHeaderEntity(),
        attributes: {},
        attributesNumber: "",
        description: "",
        options: NULL
    }, async init() {
        await this.initOpenId();
        await weiXinPayInit();
        await this.getArt();
    }, onLoad(options) {
        this.setData({
            'options': options
        })
        this.init()
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
    }, async getArt() {
        const artId = this.data.options.id;
        const user = await UserSet.getUserInfo();
        if (artId) {
            const art = await request.art({artId: <string>artId});
            if (art) {
                let nft_1df4a3ab: any = this.data.nft;
                nft_1df4a3ab.infoID = art.id;
                this.setData({
                    'nft': nft_1df4a3ab
                });
                let nft_562b9341: any = this.data.nft;
                nft_562b9341.storeid = art.stores[0].id;
                this.setData({
                    'nft': nft_562b9341
                });
                let nft_0e77edb6: any = this.data.nft;
                nft_0e77edb6.supply = art.supplied;
                this.setData({
                    'nft': nft_0e77edb6
                });
                let nft_56dfe112: any = this.data.nft;
                nft_56dfe112.maxSupply = art.maxSupply;
                this.setData({
                    'nft': nft_56dfe112
                });
                let nft_304df291: any = this.data.nft;
                nft_304df291.isBlind = art.stores[0].isBlind;
                this.setData({
                    'nft': nft_304df291
                });
                // // FIXME
                // if (!openId && Number.parseFloat(art.mintPrice) > 0 && (art.maxSupply - art.supplied > 0) && PublicUtils.isWeChat() && !<string>this.options.type) {
                //     // const artId = art.id;
                //     // const storeId = <string>this.options.sid;
                //     // location.href = WeiXinApi.getAuthorizePath({artId, storeId});
                //     return;
                // }
                let nft_af2bc534: any = this.data.nft;
                nft_af2bc534.uid = art.stores[0].user.id;
                this.setData({
                    'nft': nft_af2bc534
                });
                let nft_0f3103b9: any = this.data.nft;
                nft_0f3103b9.imgs.headerImg = ImgPathUtils.getMedia(art.id);
                this.setData({
                    'nft': nft_0f3103b9
                });
                let nft_ec3364bc: any = this.data.nft;
                nft_ec3364bc.artName = art.name;
                this.setData({
                    'nft': nft_ec3364bc
                });
                let nft_7435d53d: any = this.data.nft;
                nft_7435d53d.price = art.mintPrice;
                this.setData({
                    'nft': nft_7435d53d
                });
                let nft_857e46ca: any = this.data.nft;
                nft_857e46ca.storeName = art.stores[0].name;
                this.setData({
                    'nft': nft_857e46ca
                });
                if (art.attrs) {
                    let attributes_95880920: any = this.data.attributes;
                    attributes_95880920 = art.attrs;
                    this.setData({
                        'attributes': attributes_95880920
                    });
                    this.getArtStat();
                }
                let description_b030c23d: any = this.data.description;
                description_b030c23d = art.description;
                this.setData({
                    'description': description_b030c23d
                });
                if (user) {
                    this.favExists();
                }
            }
        }
    }, async getArtStat() {
        const artId = this.options.id;
        const artStat = await request.artStat({storeId: <string>artId});
        if (artStat) {
            if (artStat) {
                let attributesNumber_32da6f95: any = this.data.attributesNumber;
                attributesNumber_32da6f95 = artStat;
                this.setData({
                    'attributesNumber': attributesNumber_32da6f95
                });
            } else {
                let attributesNumber_60177a79: any = this.data.attributesNumber;
                attributesNumber_60177a79 = JSON.parse("{\"\": \"\"}");
                this.setData({
                    'attributesNumber': attributesNumber_60177a79
                });
            }
        }
    }, async likeAction(nftId: string) {
        const favoriteToggle = await request.favoriteToggle({artId: nftId}, true);
        if (favoriteToggle != null) {
            let nft_80a04f69: any = this.data.nft;
            nft_80a04f69.isLike = !this.data.nft.isLike;
            this.setData({
                'nft': nft_80a04f69
            });
        } else {
            PublicUtils.navigationBar.showLoginAction();
        }
    }, async favExists() {
        const favoriteExists = await request.favoriteExists({artId: this.data.nft.infoID});
        if (favoriteExists) {
            let nft_794bb59b: any = this.data.nft;
            nft_794bb59b.isLike = favoriteExists;
            this.setData({
                'nft': nft_794bb59b
            });
        } else {
            PublicUtils.navigationBar.showLoginAction();
        }
    }, btnAction(type: number) {
        switch (type) {
            case 0:
                this.mintArts();
                break;
            case 1:
                this.goToPage("create", "item", <string>this.options.id);
                break;
            default:
                break;
        }
    }, async mintArts() {
        if (UserSet.getToken() === null) {
            PublicUtils.ifGotoLogin();
            return;
        }
        const artId = this.data.nft.infoID;
        const storeId = <string>this.options.sid;
        var openID = openId;
        var payType = TradeType.WxJsApi;
        if (Number.parseFloat(this.data.nft.price) <= 0) {
            openID = "";
        }
        await wx.showLoading({title: ""})
        // FIXME
        // if (!PublicUtils.isWeChat()) {
        //     payType = TradeType.WxNative;
        //     openID = "";
        // }
        payType = TradeType.WxMiniProgram;
        const mint = await request.mint({
            artId: artId,
            openId: <string>openID,
            storeId: storeId,
            tradeType: payType}, true)
        if (mint) {
            if (!mint.needPay) {
                this.goToPage("phone/home", "3");
            } else {
                if (!PublicUtils.isWeChat()) {
                    await wx.hideLoading()
                    wx.navigateTo({
                        url: `/pages/PhonePayPage?id=${mint.tradeReturn.code_url}&order=${mint.orderId}&m=${mint.price}`
                    })
                    return;
                }
                const wxJsapiPayParams = await request.wxJsapiPayParams2({prepayId: mint.tradeReturn.prepay_id});
                const pay = await WXUtils.pay(wxJsapiPayParams);
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
                // TODO
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
                title: '出错', icon: 'error', duration: 2000
            })
        }
    }, gotoStore() {
        if (this.data.nft.storeid) {
            this.goToPage("collected", this.data.nft.storeid);
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
    }, bottomAction(event: any) {
        const index = event.detail;
        switch (index) {
            case 1:
                this.likeAction(<string>this.options.id);
                break;
            case 2:
                wx.showModal({
                    title: '提示', content: '功能建设中，敬请期待', showCancel: false, success(res) {
                        if (res.confirm) {
                        } else if (res.cancel) {
                        }
                    }
                })
                break;
            case 3:
                if (this.data.nft.isBlind) {
                    this.goToPage("pages/PhoneStorePage", <string>this.options.sid);
                } else {
                    this.mintArts();
                }
                break;
            default:
                break;
        }
    }, goToStore() {
        wx.navigateTo({
            url: `/pages/PhoneStorePage?id=${this.data.nft.storeid}`,
        });
    },
});
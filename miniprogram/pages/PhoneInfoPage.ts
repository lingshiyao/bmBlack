import {request} from "../api/Api";
import {InfoHeaderEntity} from "../api/entity/Info/InfoHeaderEntity";
import {UserSet} from "../api/storage/UserSet";
import {PublicUtils} from "../api/utils/PublicUtils";
import {TradeType, WxJsApiTarget} from "../api/net/gql/graphql";
import {ImgPathUtils} from "../api/utils/ImgPathUtils";
import {weiXinPayInit} from "../api/net/WeiXinPay";
import {WXUtils} from "../api/utils/WXUtils";
import {PicCDNUtils} from "../api/net/PicCDNUtils";
import {Utils} from "../api/utils/Utils";
import useThree from './PhoneInfoPageUseThree2'

var openId: string | null = null;
const NULL: any = null;
const ARRAY: any = [];

Page({
    data: {
        phoneModalLoading: NULL,
        phoneModalTips: NULL,
        nft: new InfoHeaderEntity(),
        attributes: {},
        attributesNumber: "",
        description: "",


        ////----------------------------
        attrLst: ARRAY,
        options: NULL,
        light: PicCDNUtils.getPicUrl("pic_light.png", false),
        src: PicCDNUtils.getPicUrl('icon_fire_normal.png'),
        src1: PicCDNUtils.getPicUrl('icon_flower.png'),
        headerBorder: PicCDNUtils.getPicUrl('pic_pictureframe.png', false),
        flower: PicCDNUtils.getPicUrl('pic_left.png', false),
        lockLight: PicCDNUtils.getPicUrl('ic_light.png', false),
        lock: PicCDNUtils.getPicUrl('pic_lock.png', false),
        /**
         * 0: 立即购买
         * 1: 即将开售
         * 2: 已售罄
         */
        buyStatus: 0,
        theSale: "",
        marginBottomStyle: "",
        art: NULL,
        guanzhuHeader: "",
        favTxt: "...",
        zaimayifen: false,
        address: "https://testnet.confluxscan.io/address/cfxtest:acdk7r6rzc1u9yr039mf3t1hsk1r4km4rekdzc7m4b",
        taiziUrl: PicCDNUtils.getPicUrl("pic_taizi.png", false),
        loading3d: true,
        ipfsAddress: ""
    }, async copyAddressText() {
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
    }, async copyAuthorizationText() {
        wx.setClipboardData({
            data: this.data.art.copyrightLink,
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
    }, async copyIpfsAddressText() {
        wx.setClipboardData({
            data: this.data.ipfsAddress,
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
    async initAcc() {
        wx.onAccelerometerChange(function (e) {
            //console.log(e)
        });
    },

    async init() {
        this.initOpenId();
        weiXinPayInit();
        this.getArt();
        this.setIsFav(this.data.options.id);
        this.initAcc()
    }, async setIsFav(artId: string) {
        //////////////////////////console.log("setIsFav", artId)
        const result: any = await request.favoriteExists({artId: artId}, true)
        //////////////////////////console.log(result)
        ////////////////////////console.log(result)
        if (result != null) {
            if (result == true) {
                this.setData({
                    favTxt: "取消收藏"
                })
            } else {
                this.setData({
                    favTxt: "加入收藏"
                })
            }
        }
    },
    gotoStore1() {
        //////////////////////console.log(this.data.options)
        wx.redirectTo({
            url: `/pages/PhoneStorePage?id=${this.data.options.sid}`,
        })
    },
    onLoad(options) {
        ////////console.log(options)
        const height = Utils.getBottomSafeAreaPxHeight()
        this.setData({
            marginBottomStyle: `padding-bottom:${height}px;`
        })
        this.setData({
            'options': options
        })

        //////////////////////console.log(options)

        if (options.isFromOrder != undefined && options.isFromOrder != null &&
            options.isFromOrder) {
            this.setData({
                zaimayifen: true
            })
        }
        //////////////////////////////console.log(options)


        this.init()
    }, async initOpenId() {
        const login = await WXUtils.login();
        const wxCode = login.code.toString();
        if (wxCode) {
            const wxJsapiOpenId = await request.wxJsapiOpenId({code: wxCode, target: WxJsApiTarget.MiniProgram});
            //////////////console.log(wxJsapiOpenId)
            if (wxJsapiOpenId) {
                openId = wxJsapiOpenId.response.openid;
            } else {
                wx.showToast({
                    title: '出错', icon: 'error', duration: 2000
                })
            }
        }
    }, async getArt() {
        //////////////////////////////console.log(this.data.options.id)
        const artId = this.data.options.id;
        const user = await UserSet.getUserInfoIfFailedGoLogin();
        if (artId) {
            const art = await request.art({artId: <string>artId});
            console.log(art)
            if (art) {
                //////////////console.log(art.stores[0].id)
                this.setData({
                    guanzhuHeader: ImgPathUtils.getSIcon(art.stores[0].id)
                })
                //////console.log(art.kind)
                if (art.kind == "MODEL") {
                    this.initWebGLCanvas(art.id);
                } else {
                }
                this.setData({
                    art: art
                })
                const arrtJson = art.attrs;
                const attrLstT = [];
                for (let k in arrtJson) {
                    attrLstT.push(`${k}:${arrtJson[k]}`)
                }
                this.setData({
                    attrLst: attrLstT
                })

                if (new Date(art.stores[0].openingTime).getTime() - new Date().getTime() > 0) {
                    // ////////////////////////////////console.log("// 即将开售")
                    this.setData({
                        theSale: Utils.formatDate(new Date(art.stores[0].openingTime), "MM-dd HH:mm")
                    })
                    Utils.formatDate(new Date(art.stores[0].openingTime), "MM-dd HH:mm")
                    // 即将开售
                    this.setData({
                        buyStatus: 1
                    })
                } else {
                    if (art.maxSupply - art.supplied > 0) {
                        // ////////////////////////////////console.log("// 立即购买")
                        // 立即购买
                        this.setData({
                            buyStatus: 0
                        })
                    } else {
                        // ////////////////////////////////console.log("// 已售罄")
                        // 已售罄
                        this.setData({
                            buyStatus: 2
                        })
                    }
                }

                ////////////////////////////////console.log(new Date(art.stores[0].openingTime).getTime() - new Date().getTime());

                ////////////////////////////////console.log(new Date().getTime(), Utils.formatDate(new Date(art.stores[0].openingTime), "yyyy-MM-dd HH:mm:ss"));


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
                    // this.favExists();
                }

                this.setData({
                    ipfsAddress: `https://dweb.link/ipfs/${art.mediaIpfs}`
                })
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
        ////////////////////////////console.log(favoriteToggle)
        if (favoriteToggle != null) {
            if (favoriteToggle) {
                wx.showToast({
                    title: '已收藏', icon: 'success', duration: 1000
                })
                this.setData({
                    favTxt: "取消收藏"
                })
            } else {
                wx.showToast({
                    title: '取消收藏', icon: 'success', duration: 1000
                })
                this.setData({
                    favTxt: "加入收藏"
                })
            }
            let nft_80a04f69: any = this.data.nft;
            nft_80a04f69.isLike = !this.data.nft.isLike;
            this.setData({
                'nft': nft_80a04f69
            });
        } else {
            WXUtils.gotoLogin();
            // wx.reLaunch({
            //     url: '/pages/PhoneLoginNew',
            // })
            // PublicUtils.navigationBar.showLoginAction();
        }
    }, async favExists() {
        const favoriteExists = await request.favoriteExists({artId: this.data.nft.infoID}, true);
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
        // wx.reLaunch({
        //     url: '/pages/PhoneApp?index=3',
        // });
        // return;
        // if (await StorageUtils.getStorage(AppConstant.TOKEN) == null) {
        //     WXUtils.gotoLogin();
        //     return;
        // }
        const artId = this.data.nft.infoID;
        const storeId = <string>this.options.sid;
        var openID = openId;
        var payType = TradeType.WxJsApi;
        if (Number.parseFloat(this.data.nft.price) <= 0) {
            openID = "";
        }
        await wx.showLoading({title: "加载中..."})
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
            tradeType: payType
        }, true)
        //////////////////////////////console.log(mint)
        ////////////////////////console.log(mint)
        if (mint && typeof mint === 'string') {
            wx.showModal({
                title: '提示', content: mint, showCancel: false, success(res) {
                    if (res.confirm) {
                    } else if (res.cancel) {
                    }
                }
            })
            wx.hideLoading();
            return;
        }

        if (mint) {
            if (!mint.needPay) {
                await wx.hideLoading()
                wx.reLaunch({
                    url: '/pages/PhoneApp?index=3',
                });
                // this.goToPage("phone/home", "3");
            } else {
                if (!PublicUtils.isWeChat()) {
                    await wx.hideLoading()
                    wx.navigateTo({
                        url: `/pages/PhonePayPage?id=${mint.tradeReturn.code_url}&order=${mint.orderId}&m=${mint.price}`
                    })
                    return;
                }
                const wxJsapiPayParams = await request.wxJsapiPayParams({
                    target: WxJsApiTarget.MiniProgram,
                    prepayId: mint.tradeReturn.prepay_id
                });
                ////////////console.log(wxJsapiPayParams)
                const pay = await WXUtils.pay(wxJsapiPayParams);
                if (pay.success) {
                    wx.showToast({
                        title: '支付完成！', icon: 'error', duration: 2000
                    })
                    wx.reLaunch({
                        url: '/pages/PhoneApp?index=3',
                    });
                } else {
                    //////////////////////console.log(pay)
                    await wx.showModal({
                        title: '提示', content: `支付失败：${JSON.stringify(pay.res.errMsg)}`, showCancel: false
                    })
                }
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
    }, setFav() {
        ////////////////////////////console.log("setFav")
        this.likeAction(<string>this.options.id);
    }, goToStore() {
        wx.navigateTo({
            url: `/pages/PhoneStorePage?id=${this.data.nft.storeid}`,
        });
    }, guanzhu() {
        wx.showModal({
            title: '提示', content: '功能建设中，敬请期待', showCancel: false, success(res) {
                if (res.confirm) {
                } else if (res.cancel) {
                }
            }
        })
    }, async initWebGLCanvas(id: string) {
        const that = this;
        const swidth = WXUtils.getScreenWidth()
        const width = swidth * 0.73;
        const height = swidth * 0.73;
        while (true) {
            const query = wx.createSelectorQuery().in(this);
            const node = query.select('#webgl').node();
            if (node != null) {
                const res = await new Promise(resolve => {
                    node.exec((res) => {
                        resolve(res)
                    })
                })
                if (res != null && res[0]) {
                    const canvas = res[0].node;
                    useThree(canvas, id, width, height, ()=>{
                        that.setData({
                            loading3d: false
                        })
                    })
                    break;
                }
            }
            await Utils.sleep(10);
        }
    }
});
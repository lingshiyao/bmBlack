import {PhoneTabbarEntity} from "../compoments/Tabbar/PhoneTabbarEntity";
import {UserSet} from "../api/storage/UserSet";
import {PicCDNUtils} from "../api/net/PicCDNUtils";
import {Utils} from "../api/utils/Utils";
import {WXUtils} from "../api/utils/WXUtils";
import {Globals} from "../api/Globals";

const NULL: any = null;

Page({
    data: {
        showViews: new Array<Boolean>(),
        tabbarData: new Array<PhoneTabbarEntity>(),
        toolsIndex: 0,
        bottomSafe: "",
        index: 0,
        hotScrollHeight: "height:0px",
        phoneMy: NULL,
        tabbarStatus: 1,
        tabbarAnimation: ""
    },

    async initHotBannerHeight() {
        ////////////////////console.log("initHotBannerHeight")
        if (Globals.homeBannerHeight == 0) {
            const res = await WXUtils.getRect("#phoneHomeTitleBar");
            Globals.homeBannerHeight = WXUtils.getScreenHeight() - WXUtils.getStatusBarHeight() - res[0].height;
        }

        //////////////////////////console.log(res);
        //////////////////////////console.log(res[0].height);
        //////////////////////////console.log(wx.getSystemInfoSync(), WXUtils.getScreenHeight())
        this.setData({
            hotScrollHeight: `height:${Globals.homeBannerHeight}px;`
        })
    },

    async getHotScrollViewHeight() {
        // const res = await WXUtils.getRect("#phoneHomeTitleBar");
        // WXUtils.get
    },

    onLoad(options) {
        if (options.index != null && options.index != undefined) {
            this.setData({
                index: parseInt(options.index.toString())
            })
        }

        this.createdTabbarData();
        this.setSelectTabbarItem();

        // //////////////////////////////console.log(Utils.getBottomSafeAreaRpxHeight());
        this.setData({
            'bottomSafe': `padding-bottom: ${Utils.getBottomSafeAreaPxHeight() * 0.7}px;`
        })

        // var query = wx.createSelectorQuery();
        // query.select('#phoneHomeTitleBar').boundingClientRect()
        // query.exec(function (res) {
        //     //res就是 所有标签为mjltest的元素的信息 的数组
        //     //////////////////////////console.log(res);
        //     //取高度
        //     //////////////////////////console.log(res[0].height);
        // })
        this.initHotBannerHeight();

        this.selectComponent("#phoneTabbar").choose(this.data.index);
        //////////////////console.log(this.selectComponent("#phoneTabbar"))
        this.setData({
            phoneMy: this.selectComponent("#phone-my-id")
        })
        //////////////////console.log(this.data.phoneMy)

        WXUtils.shakeToDebugPage();
    },

    setSelectTabbarItem() {
        this.setData({
            'showViews': [false, false, false, false, false]
        });

        let showViews: any = this.data.showViews;
        showViews[Number(this.data.index)] = true;
        this.setData({
            'showViews': showViews
        });

        let tabbarData: any = this.data.tabbarData;
        tabbarData[Number(this.data.index)].isSelect = true;
        this.setData({
            'tabbarData': tabbarData
        });
    }, createdTabbarData() {
        let tabbarData: any = this.data.tabbarData;
        tabbarData.push(PhoneTabbarEntity.init(
            PicCDNUtils.getPicUrl("icon_work_normal.png", false),
            PicCDNUtils.getPicUrl("icon_work_selected.png", false), "首页"));
        tabbarData.push(PhoneTabbarEntity.init(
            PicCDNUtils.getPicUrl("ic_sort_normal.png", false),
            PicCDNUtils.getPicUrl("ic_sort_selected.png", false), "分类"));
        tabbarData.push(PhoneTabbarEntity.init(
            PicCDNUtils.getPicUrl("ic_creation_normal1.png", false),
            PicCDNUtils.getPicUrl("ic_creation_selected1.png", false), "创作"));
        tabbarData.push(PhoneTabbarEntity.init(
            PicCDNUtils.getPicUrl("ic_mine_normal.png", false),
            PicCDNUtils.getPicUrl("ic_mine_selected.png", false), "我的"));
        this.setData({
            'tabbarData': tabbarData
        });
    },

    async taBarIndexMy(event: any) {
        let index = parseInt(event.detail);
        //////////////////console.log(index)
        if (index == 1) {
            // this._taBarIndex(index);
        } else {
            // this._taBarIndex(index);
        }
    },

    async taBarIndex(event: any) {
        this.initHotBannerHeight()
        let index = parseInt(event.detail);
        let isCollected = false;
        let isMy = false;
        if (index == 3) {
            isMy = true;
        }
        if (index == 99) {
            index = 3;
            isCollected = true;
        }
        this._taBarIndex(index);
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0,
            selector: "#scroll-view"
        })
        if (isCollected) {
            for (; true;) {
                const phoneMy = this.selectComponent("#phone-my-id");
                if (phoneMy != null) {
                    phoneMy.chooseCollected();
                    break;
                }
                await Utils.sleep(100);
            }
        }
        if (isMy) {
            for (; true;) {
                const phoneMy = this.selectComponent("#phone-my-id");
                if (phoneMy != null) {
                    phoneMy.chooseOrder();
                    break;
                }
                await Utils.sleep(100);
            }
        }
    },

    async _taBarIndex(index: number) {
        if (index === 3) {
            const result = await UserSet.getUserInfoIfFailedGoLogin();
            ////////////console.log(result)
            if (result == null)
                return
        }
        let showViews: any = [false, false, false, false, false];
        showViews[index] = true;
        this.setData({
            'showViews': showViews
        });
    }, goToExplore(event: any) {
        const index = parseInt(event.detail);
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0,
            selector: "#scroll-view"
        })
        if (index === 100) {
            this._taBarIndex(2);
            let tabbarData: any = this.data.tabbarData;
            tabbarData[0].isSelect = false;
            tabbarData[1].isSelect = false;
            tabbarData[2].isSelect = true;
            tabbarData[3].isSelect = false;
            this.setData({
                'tabbarData': tabbarData
            });
            return;
        } else {
            this._taBarIndex(1);
            let tabbarData: any = this.data.tabbarData;
            tabbarData[0].isSelect = false;
            tabbarData[1].isSelect = true;
            tabbarData[2].isSelect = false;
            tabbarData[3].isSelect = false;
            this.setData({
                'tabbarData': tabbarData
            });
            this.setData({
                'toolsIndex': index
            });
        }
    }, goToVHtml(event: any) {
        const index = parseInt(event.detail.toString());
        switch (index) {
            case 1: {
                wx.navigateTo({
                    url: `/pages/PhoneVHTML?key=nft_intro`
                })
                break;
            }
            case 2: {
                wx.navigateTo({
                    url: `/pages/PhoneVHTML?key=nft_how_get`
                })
                break;
            }
            case 3: {
                wx.navigateTo({
                    url: `/pages/PhoneVHTML?key=nft_how_buy`
                })
                break;
            }
            default: {
                break;
            }
        }
    }, handleTouchStart() {
        ////////////console.log("handleTouchStart")
        const anim = "animate__animated animate__fadeOutDownBig";
        if (this.data.tabbarAnimation != anim) {
            this.setData({
                tabbarAnimation: "animate__animated animate__fadeOutDownBig"
            })
        }
        // this.setData({
        //     tabbarStatus: 0
        // })
    }, handleTouchEnd() {
        ////////////console.log("handleTouchEnd")
        const that = this;
        setTimeout(() => {
            that.setData({
                tabbarAnimation: "animate__animated animate__fadeInUpBig"
            })
            ////////////console.log(that.data.tabbarAnimation)
        }, 1000)
        // await Utils.sleep(1000)
        // this.setData({
        //     tabbarStatus: 1
        // })

        // this.setData({
        //     tabbarAnimation: ""
        // })

    }
});
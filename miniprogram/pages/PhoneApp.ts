import {PhoneTabbarEntity} from "../compoments/Tabbar/PhoneTabbarEntity";
import {UserSet} from "../api/storage/UserSet";
import {PicCDNUtils} from "../api/net/PicCDNUtils";
import {Utils} from "../api/utils/Utils";
import {WXUtils} from "../api/utils/WXUtils";
import {Globals} from "../api/Globals";
import { User } from "../api/net/gql/graphql";

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
        if (Globals.homeBannerHeight == 0) {
            const res = await WXUtils.getRect("#phoneHomeTitleBar");
            Globals.homeBannerHeight = WXUtils.getScreenHeight() - WXUtils.getStatusBarHeight() - res[0].height;
        }
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
        this.setData({
            'bottomSafe': `padding-bottom: ${Utils.getBottomSafeAreaPxHeight() * 0.7}px;`
        })
        this.initHotBannerHeight();
        this.selectComponent("#phoneTabbar").choose(this.data.index);
        this.setData({
            phoneMy: this.selectComponent("#phone-my-id")
        })
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
            PicCDNUtils.getPicUrl("icon_work_selected.png", false), "??????"));
        tabbarData.push(PhoneTabbarEntity.init(
            PicCDNUtils.getPicUrl("ic_sort_normal.png", false),
            PicCDNUtils.getPicUrl("ic_sort_selected.png", false), "??????"));
        tabbarData.push(PhoneTabbarEntity.init(
            PicCDNUtils.getPicUrl("ic_creation_normal1.png", false),
            PicCDNUtils.getPicUrl("ic_creation_selected1.png", false), "??????"));
        tabbarData.push(PhoneTabbarEntity.init(
            PicCDNUtils.getPicUrl("ic_mine_normal.png", false),
            PicCDNUtils.getPicUrl("ic_mine_selected.png", false), "??????"));
        this.setData({
            'tabbarData': tabbarData
        });
    },

    async taBarIndexMy(event: any) {
        let index = parseInt(event.detail);
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
            const result: User | null = await UserSet.getUserInfoIfFailedGoLogin();
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
        const that = this;
        setTimeout(() => {
            that.setData({
                tabbarAnimation: "animate__animated animate__fadeInUpBig"
            })
            setTimeout(() => {
                that.setData({
                    tabbarAnimation: ""
                })
            }, 1000)
        }, 1000)
    }
});
import {PhoneTabbarEntity} from "../compoments/Tabbar/PhoneTabbarEntity";
import {UserSet} from "../api/storage/UserSet";
import {PicCDNUtils} from "../api/net/PicCDNUtils";
import { Utils } from "../api/utils/Utils";

const NULL: any = null;

Page({
    data: {
        showViews: new Array<Boolean>(),
        tabbarData: new Array<PhoneTabbarEntity>(),
        toolsIndex: 0,
        options: NULL,
        bottomSafe: "",
    },

    onLoad(options) {
        this.setData({
            'options': options
        })
        this.createdTabbarData();
        this.setSelectTabbarItem();

        console.log(Utils.getBottomSafeAreaRpxHeight());
        this.setData({
            'bottomSafe': `padding-bottom: ${Utils.getBottomSafeAreaPxHeight() * 0.7}px;`
        })
    },

    setSelectTabbarItem() {
        const index = this.data.options.id;
        if (index) {
            this.setData({
                'showViews': [false, false, false, false, false]
            });

            let showViews: any = this.data.showViews;
            showViews[Number(index)] = true;
            this.setData({
                'showViews': showViews
            });

            let tabbarData: any = this.data.tabbarData;
            tabbarData[Number(index)].isSelect = true;
            this.setData({
                'tabbarData': tabbarData
            });
        } else {
            let tabbarData: any = this.data.tabbarData;
            tabbarData[0].isSelect = true;
            this.setData({
                'tabbarData': tabbarData
            });

            let showViews: any = [false, false, false, false, false];
            showViews[0] = true;
            this.setData({
                'showViews': showViews
            });
        }
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

    async taBarIndex(event: any) {
        const index = parseInt(event.detail);
        this._taBarIndex(index);
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0,
            selector: "#scroll-view"
        })
    },

    async _taBarIndex(index: number) {
        // FIXME
        // router.replace({
        //     query: {
        //         id: index.toString()
        //     }
        // });
        if (index === 3) {
            await UserSet.getUserInfoIfFailedGoLogin();
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
    }
});
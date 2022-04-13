import {request} from "../api/Api";
import {ImgPathUtils} from "../api/utils/ImgPathUtils";
import {MyCollectionsItemEntity} from "../api/entity/My/MyCollectionsItemEntity";
import {WXUtils} from "../api/utils/WXUtils";
import {Utils} from "../api/utils/Utils";

const ARRAY: any = null;
let _pageIndex = 0;
const NULL: any = null;

Page({
    data: {
        title: "",
        exploreItemData: [],
        showStyle: "",
        scrollStyle: "",
        options: NULL
    },
    async bindDownLoad() {
        _pageIndex++;
        this.createdExploreData(this.data.options.id);
    },
    async initScroll() {
        const rect = await WXUtils.getRect2("#title", this);
        this.setData({
            scrollStyle: `height:${WXUtils.getScreenHeight() - WXUtils.getStatusBarHeight() - rect[0].height}px`
        })
    },
    onLoad: function (options) {
        _pageIndex = 0
        this.setData({
            options: options
        })
        const _options: any = options;
        const index = parseInt(_options.id.toString());
        switch (index) {
            case 1:
                this.setData({
                    title: "艺术品"
                })
                break;
            case 2:
                this.setData({
                    title: "头像"
                })
                break;
            case 3:
                this.setData({
                    title: "音乐"
                })
                break;
            case 4:
                this.setData({
                    title: "体育"
                })
                break;
            case 5:
                this.setData({
                    title: "交易卡"
                })
                break;
            case 6:
                this.setData({
                    title: "元宇宙"
                })
                break;
        }
        this.createdExploreData(_options.id);
        this.initScroll();
    },

    async createdExploreData(id: string) {
        ///// 获取 user
        wx.showLoading({title: "加载中..."})
        const stores = await request.stores({
            pageIndex: _pageIndex,
            cateId: id,
            includeHidden: true,
            pageSize: 6
        }, true)
        wx.hideLoading();
        if (stores) {
            for (const key in stores.list) {
                if (Object.prototype.hasOwnProperty.call(stores.list, key)) {

                    const element = stores.list[key];

                    // banner
                    const banner = ImgPathUtils.getSBanner(element.id);

                    // icon
                    const icon = ImgPathUtils.getSIcon(element.id);

                    // 初始化 实体
                    const data = MyCollectionsItemEntity.init(banner, icon, element.name, element.description, element.artCount.toString(), element.id);

                    data.category = stores.list[key].category.name
                    const exploreItemDataT = this.data.exploreItemData;
                    exploreItemDataT.push(data);
                    this.setData({
                        exploreItemData: exploreItemDataT
                    })
                    await Utils.sleep(200);
                    //////////////////console.log(this.data.exploreItemData)
                }
            }
        }
    }, goToStore(event: any) {
        const index = parseInt(event.currentTarget.dataset.index.toString());
        //////////////////////////////console.log(index);
        wx.navigateTo({
            url: `/pages/PhoneStorePage?id=${this.data.exploreItemData[index].id}`,
        })
    },
});
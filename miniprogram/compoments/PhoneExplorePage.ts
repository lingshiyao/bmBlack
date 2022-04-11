import {request} from "../api/Api";
import {MyCollectionsItemEntity} from "../api/entity/My/MyCollectionsItemEntity";
import {ImgPathUtils} from "../api/utils/ImgPathUtils";
import {SelectToolBarEntity} from "./Explore/SelectToolBarEntity";

Component({
    properties: {
        index: {
            type: Number, value: 0
        }
    }, data: {
        toolBarData: new Array<SelectToolBarEntity>(), exploreItemData: new Array<MyCollectionsItemEntity>()
    }, methods: {
        async createdTabbarData() {
            const categories = await request.categories();
            if (categories != null) {
                const toolBarDataT = this.data.toolBarData;
                for (const key in categories) {
                    if (Object.prototype.hasOwnProperty.call(categories, key)) {
                        const element = categories[key];
                        const temp: SelectToolBarEntity = {
                            id: element.id, order: element.order.toString(), title: element.name, isSelect: false,
                        };
                        toolBarDataT.push(temp);
                    }
                }
                if (this.properties.index) {
                    toolBarDataT[this.properties.index].isSelect = true;
                    this.createdExploreData(toolBarDataT[this.properties.index].id);
                } else {
                    toolBarDataT[0].isSelect = true;
                    this.createdExploreData(toolBarDataT[0].id);
                }
                this.setData({
                    'toolBarData': toolBarDataT
                })
            } else {

            }
        },

        /**
         *  切换分类
         **/
        async selectToolIndex(event: any) {
            const index = event.detail;
            // ////////////////////console.log(index);
            this.setData({
                'exploreItemData': [],
            })
            // ////////////////////console.log(this.data.toolBarData[index].id)
            await this.createdExploreData(this.data.toolBarData[index].id);
        }, /**
         *  进入商店
         **/
        goToStore(event: any) {
            const index = parseInt(event.currentTarget.dataset.index.toString());
            wx.navigateTo({
                url: `/pages/PhoneStorePage?id=${this.data.exploreItemData[index].id}`,
            })
        }, async createdExploreData(id: string) {
            ///// 获取 user
            const stores = await request.stores({
                pageIndex: 0, cateId: id, includeHidden: true, pageSize: 1000
            }, true)
            if (stores) {
                const exploreItemDataT = [];
                for (const key in stores.list) {
                    if (Object.prototype.hasOwnProperty.call(stores.list, key)) {

                        const element = stores.list[key];

                        // banner
                        const banner = ImgPathUtils.getSBanner(element.id);

                        // icon
                        const icon = ImgPathUtils.getSIcon(element.id);

                        // 初始化 实体
                        const data = MyCollectionsItemEntity.init(banner, icon, element.name, element.description, element.artCount.toString(), element.id);

                        exploreItemDataT.push(data);
                    }
                }
                this.setData({
                    'exploreItemData': exploreItemDataT
                })
            }
        }
    }, ready() {
        ///// 初始化选择框
        this.createdTabbarData();
    }
});



















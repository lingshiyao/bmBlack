import {CollectCardDataEntity} from "../../api/entity/Collect/CollectItemsListItemEntity";
import {SelectBoxEntity} from "../../api/entity/Tools/SelectBoxEntity";
import {CollectBannerEntity} from "../../api/entity/Collect/CollectBannerEntity";

Component({
    data: {
        selectBoxData: new SelectBoxEntity()
    }, methods: {
        async bindDownLoad() {
            console.log("bindDownLoad")
        },
        clickCallBack(event: any) {
            const json = event.detail;
            const key: string = json.key;
            if (key.length > 0) {
                if (key === this.data.selectBoxData.menu[0]) {
                    this.search("false");
                } else {
                    this.search("true");
                }
            }
        }, search(key: string) {
            this.triggerEvent('search', key);
        }, goToInfo(event: any) {
            const index = parseInt(event.currentTarget.dataset.index.toString());
            this.triggerEvent('goToInfo', index);
        }, searchInput(e: any) {
            this.search(e.detail.value)
            // this.setData({
            //     name:
            // })
        }
    }, properties: {
        data: {
            type: Array, value: new Array<CollectCardDataEntity>()
        },
        bannerData: {
            type: Object, value: new CollectBannerEntity()
        },
        store: Object
    }, ready() {
        let selectBoxData_c01d026c: any = this.data.selectBoxData;
        selectBoxData_c01d026c.menu = ["价格: 从高到低", "价格: 从低到高",];
        this.setData({
            'selectBoxData': selectBoxData_c01d026c
        });
    }, observers: {
        'data': function (data) {
            //////////////////////////console.log(data)
        }, 'bannerData': function (bannerData) {
            //////////////////////////console.log(bannerData)
        }
    }
});
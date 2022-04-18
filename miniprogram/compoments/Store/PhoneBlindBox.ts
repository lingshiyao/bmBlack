import {CollectBannerEntity} from "../../api/entity/Collect/CollectBannerEntity";
import {CollectCardDataEntity} from "../../api/entity/Collect/CollectItemsListItemEntity";
import {PicCDNUtils} from "../../api/net/PicCDNUtils";

Component({
    data: {
        text: "",
        num: 0,
        mangheImg: PicCDNUtils.getPicUrl("pic_gif.png", false)
    }, methods: {
        changeNum(event: any) {
            const n = parseInt(event.currentTarget.dataset.n.toString());
            let numT: any = this.data.num;
            numT += n;
            if (numT <= 0) numT = 0;
            this.setData({
                num: numT
            })
            this.getNumber();
        }, getNumber() {
            this.triggerEvent('getNumber', this.data.num);
        }
    }, properties: {
        data: {
            type: Array, value: new Array<CollectCardDataEntity>()
        }, bannerData: {
            type: Object, value: new CollectBannerEntity()
        }
    }, ready() {
        let text_22f70dda: any = this.data.text;
        text_22f70dda = "";
        this.setData({
            'text': text_22f70dda
        });
    }, observers: {}
});
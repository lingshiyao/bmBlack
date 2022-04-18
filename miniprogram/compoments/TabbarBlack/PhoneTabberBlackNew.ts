import {PicCDNUtils} from "../../api/net/PicCDNUtils";
import {Utils} from "../../api/utils/Utils";

Component({
    properties: {}, data: {
        centerUrl: PicCDNUtils.getPicUrl("btn_additem_selected.png", false),
        centerUrlNoChoose: PicCDNUtils.getPicUrl("btn_additem_normal.png", false),
        choose: 0,

        collectionUrl: PicCDNUtils.getPicUrl("ic_collection_normal.png", false),
        collectionSelectedUrl: PicCDNUtils.getPicUrl("ic_collection_selected.png", false),
        mimeUrl: PicCDNUtils.getPicUrl("ic_mine_normal.png", false),
        mimeUrlNoChoose: PicCDNUtils.getPicUrl("ic_mine_selected.png", false),
        homeUrl: PicCDNUtils.getPicUrl("ic_home_selected_1.png", false),
        homeUrlNoChoose: PicCDNUtils.getPicUrl("ic_home_normal_1.png", false),
        stylee: "",
    }, methods: {
        tabberAction(event: any) {
            wx.hideLoading()
            const index = parseInt(event.currentTarget.dataset.index.toString());
            this.setData({
                choose: index
            })
            this.triggerEvent('taBarIndex', index);
        }, choose(event: any) {
            if (event == 0 || event == 3 || event == 99) this.setData({choose: event})
            //////////////////////////////console.log(event)
        }
    }, ready() {
        this.setData({
            stylee: `padding-bottom:${Utils.getBottomSafeAreaPxHeight()}px`
        })
    }
});

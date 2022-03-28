import {PicCDNUtils} from "../../api/net/PicCDNUtils";

Component({
    properties: {},
    data: {
        centerUrl: PicCDNUtils.getPicUrl("btn_additem_normal.png", false),
        homeUrl: PicCDNUtils.getPicUrl("ic_home_normal.png", false),
        mimeUrl: PicCDNUtils.getPicUrl("ic_mine_normal.png", false)
    },
    methods: {
        tabberAction(event: any) {
            const index = event.currentTarget.dataset.index;
            this.triggerEvent('taBarIndex', index);
        }
    }
});

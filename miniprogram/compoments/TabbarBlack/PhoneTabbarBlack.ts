import {PicCDNUtils} from "../../api/net/PicCDNUtils";

Component({
    properties: {},
    data: {
        centerUrl: PicCDNUtils.getPicUrl("btn_additem_selected.png", false),
        centerUrlNoChoose: PicCDNUtils.getPicUrl("btn_additem_normal.png", false),
        homeUrl: PicCDNUtils.getPicUrl("ic_home_normal.png", false),
        homeUrlNoChoose: PicCDNUtils.getPicUrl("ic_home_selected.png", false),
        mimeUrl: PicCDNUtils.getPicUrl("ic_mine_normal.png", false),
        mimeUrlNoChoose: PicCDNUtils.getPicUrl("ic_mine_selected.png", false),
        choose: 0
    },
    methods: {
        tabberAction(event: any) {
            const index = parseInt(event.currentTarget.dataset.index.toString());
            this.setData({
                choose: index
            })
            this.triggerEvent('taBarIndex', index);
        },
        choose(event: any) {
            if (event == 0 || event == 3 || event == 2)
                this.setData({choose: event})
            //////////////////////////////console.log(event)
        }
    }
});

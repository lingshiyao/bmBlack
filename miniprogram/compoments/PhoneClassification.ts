import {PicCDNUtils} from "../api/net/PicCDNUtils";

Component({
    properties: {
        hotScrollHeight: {
            type: String,
            value: "height:0px"
        }
    },
    data: {
        art: PicCDNUtils.getPicUrl("pic_artwork.png", false),
        avatar: PicCDNUtils.getPicUrl("pic_avatar.png", false),
        music: PicCDNUtils.getPicUrl("pic_music.png", false),
        sports: PicCDNUtils.getPicUrl("pic_sports.png", false),
        card: PicCDNUtils.getPicUrl("pic_tradingcard.png", false),
        universe: PicCDNUtils.getPicUrl("pic_formeruniverse.png", false),
        rightArrow: PicCDNUtils.getPicUrl("pic_in.png", false)
    },
    methods: {
        gotoStoreListPage(event: any) {
            const index = event.currentTarget.dataset.index.toString();
            wx.navigateTo({
                url: `/pages/PhoneStoreListPage?id=${index}`,
            })
        }
    }
});

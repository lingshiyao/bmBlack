import {InfoHeaderEntity} from "../../api/entity/Info/InfoHeaderEntity";
import {PicCDNUtils} from "../../api/net/PicCDNUtils";

Component({
    data: {
        src: PicCDNUtils.getPicUrl('icon_fire_normal.png'),
        src1: PicCDNUtils.getPicUrl('icon_flower.png'),
        headerBorder: PicCDNUtils.getPicUrl('pic_pictureframe.png', false),
        flower: PicCDNUtils.getPicUrl('pic_left.png', false),
        lockLight: PicCDNUtils.getPicUrl('ic_light.png', false),
        lock: PicCDNUtils.getPicUrl('pic_lock.png', false)
    }, methods: {
        goToStore() {
            this.triggerEvent('goToStore');
        }
    }, properties: {
        nft: {
            type: Object, value: new InfoHeaderEntity()
        }
    }, ready() {
    }, observers: {}
});
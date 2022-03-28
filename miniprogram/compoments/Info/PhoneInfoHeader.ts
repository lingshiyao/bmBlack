import {InfoHeaderEntity} from "../../api/entity/Info/InfoHeaderEntity";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";

Component({
    data: {
        src: ImgPathUtils.getImgPath('icon_fire_normal'), src1: ImgPathUtils.getImgPath('icon_flower')
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
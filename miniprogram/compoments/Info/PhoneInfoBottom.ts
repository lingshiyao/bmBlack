import {InfoHeaderEntity} from "../../api/entity/Info/InfoHeaderEntity";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";

Component({
    data: {
        src: "", src1: ImgPathUtils.getImgPath('btn_revise'),
    }, methods: {
        action(event: any) {
            const index = parseInt(event.currentTarget.dataset.index.toString());
            this.triggerEvent('action', index);
        }
    }, properties: {
        nft: {
            type: Object, value: new InfoHeaderEntity()
        }
    }, observers: {
        'nft': function (nft) {
            this.setData({
                'src': nft.isLike ? ImgPathUtils.getImgPath('btn_collect_selected') : ImgPathUtils.getImgPath('btn_collect_normal')
            })
        }
    }
});
import {HomeBannerRightEntity} from '../../api/entity/Home/HomeBannerRightEntity';
import {PicCDNUtils} from '../../api/net/PicCDNUtils';

Component({
    data: {
        src: PicCDNUtils.getPicUrl('ic_video.png')
    }, methods: {
        goToPage(event: any) {
            const index = parseInt(event.currentTarget.dataset.index.toString());
            this.triggerEvent('goToPage', index);
        },
    }, properties: {
        bannerData: {
            type: Object, value: new HomeBannerRightEntity()
        }
    }, ready() {
    }, observers: {}
});
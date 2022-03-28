import {HomeBrowseEntity} from "../../api/entity/Home/HomeBrowseEntity";

Component({
    data: {}, methods: {
        gotoExplore(event: any) {
            const index = parseInt(event.currentTarget.dataset.index.toString());
            this.triggerEvent('gotoExplore', index);
        }
    }, properties: {
        data: {
            type: Object, value: new HomeBrowseEntity()
        }
    }, observers: {}
});
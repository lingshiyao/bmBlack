import {HomeShufflingListEntity} from "../../api/entity/Home/HomeShufflingListEntity";

Component({
    data: {}, methods: {
        goToStore(event: any) {
            const index = parseInt(event.currentTarget.dataset.index.toString());
            this.triggerEvent('goToStore', index);
        }
    }, properties: {
        data: {
            type: Object, value: new HomeShufflingListEntity()
        }
    }, observers: {}
});
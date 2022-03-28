import {SelectToolBarEntity} from "./SelectToolBarEntity";

Component({
    data: {dataEntity: new Array<SelectToolBarEntity>()}, methods: {
        tabberToolAction(event: any) {
            const index = parseInt(event.currentTarget.dataset.index.toString());
            this.selectToolIndex(index);
            for (let i = 0; i < this.data.dataEntity.length; i++) {
                if (i === index) {
                    let dataEntity_8f045ad5: any = this.data.dataEntity;
                    dataEntity_8f045ad5[i].isSelect = true;
                    this.setData({
                        'dataEntity': dataEntity_8f045ad5
                    });
                } else {
                    let dataEntity_68eb6e5b: any = this.data.dataEntity;
                    dataEntity_68eb6e5b[i].isSelect = false;
                    this.setData({
                        'dataEntity': dataEntity_68eb6e5b
                    });
                }
            }
        }, selectToolIndex(index: number) {
            this.triggerEvent('selectToolIndex', index);
        }
    }, properties: {
        data: {
            type: Array, value: new Array<SelectToolBarEntity>()
        }
    }, ready() {
        let dataEntity_2eff1da0: any = this.data.dataEntity;
        dataEntity_2eff1da0 = this.properties.data;
        this.setData({
            'dataEntity': dataEntity_2eff1da0
        });
    }, observers: {
        'data': function (data) {
            this.setData({
                'dataEntity': data
            });
        }
    }
});
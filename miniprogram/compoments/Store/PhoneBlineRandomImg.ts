import {CollectCardDataEntity} from "../../api/entity/Collect/CollectItemsListItemEntity";

const NULL: any = null;
const ARRAY: any = [];
let loadingStatus: Array<boolean> = [];
let index = 0;

Component({
    data: {
        timeOut: NULL, styles: ARRAY,
    }, methods: {
        onLoadingSuccess(event: any) {
            const index = parseInt(event.currentTarget.dataset.index.toString());
            loadingStatus[index] = true;
        }, init() {
            let timeOut = 0;
            let fn = () => {
                if (this.properties.data.length > 0) {
                    if (index >= this.properties.data.length) {
                        index = 0;
                    }

                    for (let i = index; i < this.properties.data.length + index; i++) {
                        const _index = i % this.properties.data.length;
                        if (loadingStatus[_index]) {
                            timeOut = 4000;
                            // 找到下一张轮播图
                            const cleanStyles = [];
                            for (let j = 0; j < this.properties.data.length; j++) {
                                cleanStyles.push("display: none;");
                            }
                            cleanStyles[_index] = "display: inline-flex;"
                            this.setData({
                                styles: cleanStyles
                            })
                            // ////////////////////////////////console.log(this.data.styles)
                            break;
                        }
                    }
                    index++;
                }
                clearTimeout(this.data.timeOut);
                this.setData({
                    'timeOut': setTimeout(fn, timeOut)
                });
            };
            fn();
        }
    }, properties: {
        data: {
            type: Array, value: new Array<CollectCardDataEntity>(),
        }
    }, ready() {

    }, observers: {
        'data': function (data: any) {
            // ////////////////////////////////console.log(data)
            const stylesT = [];
            for (let i = 0; i < data.length; i++) {
                stylesT.push("display: none;");
            }
            this.setData({
                styles: stylesT
            })

            loadingStatus = [];
            for (let i = 0; i < data.length; i++) {
                loadingStatus.push(false);
            }
            this.init()
        }
    }, detached() {
        clearTimeout(this.data.timeOut);
    }
});
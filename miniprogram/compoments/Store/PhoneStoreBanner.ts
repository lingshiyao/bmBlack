import {CollectBannerEntity} from "../../api/entity/Collect/CollectBannerEntity";
import { Utils } from "../../api/utils/Utils";

Component({
    data: {
        time:"111"
    },
    methods: {},
    properties: {
        data: {
            type: Object,
            value: new CollectBannerEntity()
        }
    },
    ready() {
    },
    observers: {
        'data': function (data:CollectBannerEntity) {
            this.setData({
                time: Utils.formatDate(new Date(data.projectTime), "yyyy-MM-dd HH:mm:ss")
            })
        }
    }
});
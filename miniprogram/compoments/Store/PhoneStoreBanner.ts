import {CollectBannerEntity} from "../../api/entity/Collect/CollectBannerEntity";
import {Utils} from "../../api/utils/Utils";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";
import {PicCDNUtils} from "../../api/net/PicCDNUtils";

Component({
    data: {
        time: "111",
        icon: "",
        mask: PicCDNUtils.getPicUrl("pic_info_mask.png", false),
        style: "overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 4; -webkit-box-orient: vertical;",
        showzip: false,
        logic: true
    },
    methods: {
        unzip() {
            this.setData({
                style: "",
                logic: false
            })
        }
    },
    properties: {
        data: {
            type: Object,
            value: new CollectBannerEntity()
        },
        data1: Object
    },
    ready() {
    },
    observers: {
        'data': async function (data: CollectBannerEntity) {
            ////////////////////console.log(data, ImgPathUtils.getSIcon(data.storeId))
            this.setData({
                time: Utils.formatDate(new Date(data.projectTime), "yyyy-MM-dd HH:mm:ss"),
                icon: ImgPathUtils.getSIcon(data.storeId)
            })

            let that = this;
            const query = wx.createSelectorQuery().in(this)
            query.select('#dianpumingcheng-layout').boundingClientRect()
            query.exec(function (res) {
                if (res[0].height > 50) {
                    that.setData({
                        showzip: true
                    });
                }
            })

        },
        'data1': async function (data: any) {
            ////////////////////console.log(data)
        }
    }
});
import {CollectBannerEntity} from "../../api/entity/Collect/CollectBannerEntity";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";
import {PicCDNUtils} from "../../api/net/PicCDNUtils";
import { Store } from "../../api/net/gql/graphql";

Component({
    data: {
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
        store: Object
    },
    ready() {
    },
    observers: {
        'data': async function (data: CollectBannerEntity) {
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
        'store': async function (store: Store) {
            this.setData({
                icon: ImgPathUtils.getUserFace(store.user.id)
            })
        }
    }
});
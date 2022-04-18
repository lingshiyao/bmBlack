import {CollectCardDataEntity} from "../../api/entity/Collect/CollectItemsListItemEntity";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";
import {PublicUtils} from "../../api/utils/PublicUtils";
import {PicCDNUtils} from "../../api/net/PicCDNUtils";

Component({
    data: {
        id: "phone_store_item_img",
        src: PicCDNUtils.getPicUrl('icon_flower.png', false),
        src1: ImgPathUtils.getImgPath('ic_favorited_selected'),
        style: "border: solid black; border-width: 0.5vw 0vw 0vw 0vw;",
        maiwanleUrl: PicCDNUtils.getPicUrl('pic_none.png', false),
    }, methods: {
        async init() {
        },
    }, properties: {
        data: {
            type: Object, value: new CollectCardDataEntity()
        }, storeName: {
            type: String, value: ""
        }
    }, ready() {
        let id_d8a61b51: any = this.data.id;
        id_d8a61b51 = `phone_store_item_img${PublicUtils.generateUUID()}`;
        this.setData({
            'id': id_d8a61b51
        });
        this.init()
    },

    observers: {
        'data': function (data) {
            ////////////////////////////console.log(data.category)
            if (data.category == '艺术品') {
                this.setData({
                    style: "border: 1vw solid #7076DB; border-width: 0.5vw 0vw 0vw 0vw;"
                })
            } else if (data.category == '头像') {
                this.setData({
                    style: "border: 1vw solid #C89438; border-width: 0.5vw 0vw 0vw 0vw;"
                })
            } else if (data.category == '音乐') {
                this.setData({
                    style: "border: 1vw solid #10966E; border-width: 0.5vw 0vw 0vw 0vw;"
                })
            } else if (data.category == '体育') {
                this.setData({
                    style: "border: 1vw solid #2B6EC5; border-width: 0.5vw 0vw 0vw 0vw;"
                })
            } else if (data.category == '交易卡') {
                this.setData({
                    style: "border: 1vw solid #A83536; border-width: 0.5vw 0vw 0vw 0vw;"
                })
            } else if (data.category == '元宇宙') {
                this.setData({
                    style: "border: 1vw solid #0FA0B8; border-width: 0.5vw 0vw 0vw 0vw;"
                })
            }
            ////////////////////////////console.log(data)
        }
    }
});
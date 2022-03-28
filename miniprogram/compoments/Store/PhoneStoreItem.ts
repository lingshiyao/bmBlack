import {CollectCardDataEntity} from "../../api/entity/Collect/CollectItemsListItemEntity";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";
import {PublicUtils} from "../../api/utils/PublicUtils";

Component({
    data: {
        id: "phone_store_item_img",
        src: ImgPathUtils.getImgPath('icon_flower'),
        src1: ImgPathUtils.getImgPath('ic_favorited_selected')
    },
    methods: {},
    properties: {
        data: {
            type: Object,
            value: new CollectCardDataEntity()
        }
    },
    ready() {
        let id_d8a61b51: any = this.data.id;
        id_d8a61b51 = `phone_store_item_img${PublicUtils.generateUUID()}`;
        this.setData({
            'id': id_d8a61b51
        });
    },
    observers: {}
});
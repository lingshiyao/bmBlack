import {PicCDNUtils} from "../../api/net/PicCDNUtils";

Component({
    properties: {
        text: {
            type: String, value: "暂无记录"
        }
    }, data: {
        src: PicCDNUtils.getPicUrl("pic_no.png", false)
    }, methods: {}
});
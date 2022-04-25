import {MyCollectionsItemEntity} from "../../api/entity/My/MyCollectionsItemEntity";

Component({
    data: {
        style: "border: solid black; border-width: 0.5vw 0vw 0vw 0vw;"
    }, methods: {}, properties: {
        data: {
            type: Object, value: new MyCollectionsItemEntity(),

        }
    }, ready() {
    }, observers: {
        'data': function (data) {
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
        }
    }
});
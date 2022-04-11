import {PicCDNUtils} from "../../api/net/PicCDNUtils";

interface ConfirmListener {
    onConfirm(data: number): void;

    onCancel(): void;
}

let listener: ConfirmListener | null = null;

Component({
    properties: {}, data: {
        isShow: false,
        picAdd: PicCDNUtils.getPicUrl("btn_add1.png", false),
        picSub: PicCDNUtils.getPicUrl("btn_reduce1.png", false),
        num: 1,
        price: 0.01
    }, methods: {
        show(price: number) {
            this.setData({
                price: price
            })
            this.setData({
                'isShow': true
            })
            return new Promise<any>((resolve) => {
                listener = {
                    onConfirm: (data:number): void => {
                        resolve(data);
                    }, onCancel: (): void => {
                        resolve(null);
                    },
                }
            });
        }, submit() {
            this.setData({
                'isShow': false
            })
            setTimeout(() => {
                if (listener) listener.onConfirm(this.data.num);
            }, 0)
        }, cancel() {
            this.setData({
                isShow: false
            })
            setTimeout(() => {
                if (listener) listener.onCancel();
            }, 0)
        }, add() {
            let numT = this.data.num;
            numT++;
            this.setData({
                num:numT
            })
        }, sub() {
            let numT = this.data.num;
            numT--;
            if (numT < 1)
                numT = 1
            this.setData({
                num:numT
            })
        }
    }
});
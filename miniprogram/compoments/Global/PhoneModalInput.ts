import {ModalInputParam} from "./ModalInputParam";

interface ConfirmListener {
    onConfirm(data: Array<string>): void;

    onCancel(): void;
}

const ARRAY: any = [];

let listener: ConfirmListener | null = null;

Component({
    properties: {}, data: {
        inputs: ARRAY, type: ARRAY, modalInputParam: {
            defaultValue: ARRAY, inputPlaceholder: ARRAY, submitContent: "", title: "", isPwd: ARRAY
        }, isShow: false
    }, methods: {
        show(_modalInputParam: ModalInputParam) {
            this.setData({
                'isShow': true
            })
            this.setData({
                'modalInputParam': _modalInputParam
            })
            const inputsT = [];
            const typeT = [];
            for (let i = 0; i < _modalInputParam.inputPlaceholder.length; i++) {
                inputsT.push(_modalInputParam.defaultValue[i]);
                if (_modalInputParam.isPwd[i] == true) {
                    typeT.push("password")
                } else {
                    typeT.push("")
                }
            }
            this.setData({
                'type': typeT, inputs: inputsT
            })
            return new Promise<any>((resolve) => {
                listener = {
                    onConfirm: (data: string[]): void => {
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
                if (listener) listener.onConfirm(this.data.inputs);
            }, 0)
        }, cancel() {
            this.setData({
                isShow: false
            })
            setTimeout(() => {
                if (listener) listener.onCancel();
            }, 0)
        }, myInput(e: any) {
            const index: number = e.currentTarget.dataset.index;
            const txt: string = e.detail.value;
            const inputsT = this.data.inputs;
            inputsT[index] = txt;
            this.setData({
                inputs: inputsT
            })
        }
    }
});
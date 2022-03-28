Component({
    data: {
        text: ""
    }, methods: {
        getBlind() {
            this.triggerEvent('getBlind');
        }
    }, properties: {
        num: {
            type: Number, value: 1
        },
        price: {
            type: Number, value: 0.01
        }
    }, ready() {
        let text_6b593c80: any = this.data.text;
        text_6b593c80 = "";
        this.setData({
            'text': text_6b593c80
        });
    }, observers: {}
});
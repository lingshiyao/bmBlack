const debug = false;

Component({
    properties: {
        src: {
            type: String, value: "",
        },
        border: {
            type: String, value: ""
        }
    }, data: {
        loading: true,
        imgClass: "hide",
    }, ready() {
    }, methods: {
        onLoadingSuccess() {
            if (!debug) {
                this.setData({
                    'loading': false,
                })
                this.setData({
                    'imgClass': "img animate__animated animate__bounceIn animate__faster"
                })
            }
        }, onLoadingError() {
        }
    }
});

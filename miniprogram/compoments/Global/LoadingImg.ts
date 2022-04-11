import {ImageCache} from "../../api/ImageCache";

const debug = false;

Component({
    properties: {
        src: {
            type: String, value: "",
        }, stylee: {
            type: String, value: ""
        }, anim: {
            type: String, value: "animate__animated animate__bounceIn animate__faster"
        }, cacheTime: {
            type: Number, value: 5 * 60 * 1000
        }
    }, data: {
        loading: true, imgClass: "hide", newSrc: ""
    }, ready() {
    }, methods: {
        onLoadingSuccess() {
            this.setData({
                'loading': false,
            })
            this.setData({
                'imgClass': `img ${this.properties.anim}`
            })
        }, onLoadingError() {
        },
        async setImage(src: string) {
            this.setData({
                newSrc: src
            })
            /*
            if (src == "") return
            let cacheImagePath = await ImageCache.getImg(src);
            if (cacheImagePath == null) {
                cacheImagePath = await ImageCache.setImg(src);
            }
            if (cacheImagePath != null) {
                this.setData({
                    newSrc: cacheImagePath
                })
            } else {
                this.setData({
                    newSrc: src
                })
            }

            ImageCache.getImgTime(src).then(res => {
                ////console.log(res);
                ////console.log(res - new Date().getTime())
                if (res != null && res - new Date().getTime() > this.properties.cacheTime) {
                    ImageCache.updata(src, cacheImagePath).then(res => {
                        ////console.log(res)
                        if (res != null) {
                            this.setData({
                                newSrc: res
                            })
                        }
                    });
                }
            })*/
        }
    }, observers: {
        'src': function (src) {
            this.setImage(src)
        }
    }
});

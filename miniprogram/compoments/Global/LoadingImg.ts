import {ImageCache} from "../../api/ImageCache";
import {DownloadTask} from "../../api/DownloadTask";

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
            if (src == "") return
            let cacheImagePath = await ImageCache.getImg(src);
            if (cacheImagePath == null) {
                cacheImagePath = await ImageCache.setImg(src)
                if (cacheImagePath != null) {
                    this.setData({
                        newSrc: cacheImagePath
                    })
                } else {
                    this.setData({
                        newSrc: src
                    })
                }
            } else {
                this.setData({
                    newSrc: cacheImagePath
                })
                DownloadTask.addImg(src);
            }
        }
    }, observers: {
        'src': function (src) {
            this.setImage(src)
        }
    }
});

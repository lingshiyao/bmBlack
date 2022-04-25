import {request} from "../api/Api";
import {ImgPathUtils} from "../api/utils/ImgPathUtils";
import {StorePagedList} from "../api/net/gql/graphql";
import {PicCDNUtils} from "../api/net/PicCDNUtils";
import {Utils} from "../api/utils/Utils";

const NULL: any = null;
const ARRAY: any = []
let top_topStores: any = [];

Component({
    properties: {
        wxif: {
            type: Boolean,
            value: true
        },
        hotScrollHeight: {
            type: String,
            value: "height:0px"
        }
    },
    observers: {
        'wxif': function (data) {
            if (data) {
                this.setData({
                    show: "display: flex;"
                })
            } else {
                this.setData({
                    show: "display: none;"

                })
            }
        }
    },
    data: {
        top: NULL,
        stores: NULL,
        storeBanner: ARRAY,
        storeBanner2: ARRAY,
        show: "visibility: visible;",
        hotUrl: PicCDNUtils.getPicUrl("pic_hot.png", false),
        buyStatus: [],
        theSale: [],
        lst: [],
    }, methods: {
        bindDownLoad() {
            const lstLength = this.data.lst.length;
            const top_topStoresLength = top_topStores.length;
            // 3, 2
            if (top_topStoresLength > lstLength) {
                const lstT:any = this.data.lst;
                lstT.push(top_topStores[lstLength])
                this.setData({
                    lst: lstT
                })
            }
        },
        async initTop() {
            wx.showLoading({title: "加载中..."});
            const top = await request.top({});
            console.log(top)
            wx.hideLoading();
            for (let i = 0; i < top.topStores.length; i++) {
                const item: any = top.topStores[i];
                item.storeBanner = ImgPathUtils.getSIcon(item.id);
                item.header = ImgPathUtils.getUserFace(top.topStores[i].user.id);
                if (new Date(top.topStores[i].openingTime).getTime() - new Date().getTime() > 0) {
                    item.buyStatus = 1;
                    item.theSale = Utils.formatDate(new Date(top.topStores[i].openingTime), "MM-dd HH:mm");
                } else {
                    item.theSale = "";
                    if (top.topStores[i].totalSupply - 0 > 0) {
                        item.buyStatus = 0;
                    } else {
                        item.buyStatus = 2;
                    }
                }
                top_topStores.push(item)
            }
            if (top) {
                this.setData({
                    top: top
                })
            } else {
                wx.showToast({
                    title: '出错了', icon: 'error', duration: 2000
                })
            }
            if (top_topStores.length < 2) {
                this.setData({
                    lst: top_topStores
                })
            } else {
                const lstT = [];
                lstT.push(top_topStores[0])
                lstT.push(top_topStores[1])
                this.setData({
                    lst: lstT
                })
            }
        },

        async initStore() {
            const stores: StorePagedList = await request.stores({
                pageIndex: 0, pageSize: 1000
            });
            this.setData({
                stores: stores
            })
            const storeBanner2T = [];
            for (let i = 0; i < stores.list.length; i++) {
                const item = stores.list[i];
                storeBanner2T.push(ImgPathUtils.getSIcon(item.id));
            }
            this.setData({
                storeBanner2: storeBanner2T
            })
            wx.pageScrollTo({
                scrollTop: 1000,
                duration: 0,
                selector: "#b-base"
            });
        },

        async getStoreBanner() {
        },

        async gotoStore(event: any) {
            const id = event.currentTarget.dataset.id;
            wx.navigateTo({
                url: `/pages/PhoneStorePage?id=${id}`,
            })

        }
    }, ready() {
        top_topStores = [];
        this.setData({
            lst: [],
        })
        this.initTop();
    }
});

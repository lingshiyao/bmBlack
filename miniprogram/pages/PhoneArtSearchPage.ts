import {request} from "../api/Api";
import {CollectCardDataEntity} from "../api/entity/Collect/CollectItemsListItemEntity";
import {ImgPathUtils} from "../api/utils/ImgPathUtils";
import {PicCDNUtils} from "../api/net/PicCDNUtils";
import {WXUtils} from "../api/utils/WXUtils";
import {Utils} from "../api/utils/Utils";

const NULL: any = null;

let _pageIndex = 0;
let _total = 0;

Page({
    data: {
        arts: [],
        search: "",
        deleteSrc: PicCDNUtils.getPicUrl("ic_delete.png", false),
        deleteIconShow: false,
        scrollStyle: ""
    },
    bindDownLoad() {
        _pageIndex++;
        this.search();
    },
    clearInput() {
        this.setData({
            search: ""
        })
        this.setData({
            deleteIconShow: false
        })

    },
    async initTopArea() {
        const rect = await WXUtils.getRect2("#search-top-area-id", this);
        rect[0].height;
        this.setData({
            scrollStyle: `height:${WXUtils.getScreenHeight() - WXUtils.getStatusBarHeight() - rect[0].height}px`
        })
        ////////////////////console.log(rect)
    },
    onLoad: function (options) {
        _pageIndex = 0;
        _total = 0;
        this.initTopArea()
        this.search();
    },
    goToInfo(event: any) {
        // //////////////////////////////console.log(event, this.data);
        const index = parseInt(event.currentTarget.dataset.index.toString());

        wx.navigateTo({
            url: `/pages/PhoneInfoPage?id=${this.data.arts[index].id}&sid=${this.data.arts[index].sId}`
        })
    },
    myInput(e: any) {
        this.setData({
            search: e.detail.value.toString()
        })
        ////////////////////console.log(e.detail.value.toString() == "")
        if (e.detail.value.toString() == "") {

            this.setData({
                deleteIconShow: false
            })
        } else {
            this.setData({
                deleteIconShow: true
            })
        }
        ////////////////////////////console.log(e.detail, e.detail.value.toString(), this.data.search)
    },
    async clickSearch() {
        this.setData({
            arts: []
        })
        this.search()
    },
    async search() {
        const key = this.data.search;
        //////////////////////////console.log(key)
        await wx.showLoading({title: "加载中..."})
        const arts = await request.arts({
            ascByPrice: true,
            key: key,
            pageIndex: _pageIndex,
            pageSize: 6,
            storeId: null,
        })
        wx.hideLoading();
        _total = arts.total;
        for (let i = 0; i < arts.list.length; i++) {
            const item: CollectCardDataEntity = new CollectCardDataEntity();
            item.name = arts.list[i].description;
            item.author = arts.list[i].name;
            item.price = arts.list[i].mintPrice;
            item.supple = 999;
            item.sId = arts.list[i].stores[0].id;
            item.id = arts.list[i].id;
            item.headerImg = ImgPathUtils.getMedia(arts.list[i].id)
            item.category = arts.list[i].stores[0].category.name;
            const artsT = this.data.arts;
            artsT.push(item);
            this.setData({
                arts: artsT
            })
            await Utils.sleep(200);
            // //////////////////console.log(this.data.arts)
        }
    }
});
import {CollectCardDataEntity} from "../../api/entity/Collect/CollectItemsListItemEntity";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";
import {request} from "../../api/Api";
import {WXUtils} from "../../api/utils/WXUtils";
import { Utils } from "../../api/utils/Utils";

// TODO 当wx:if切换的时候此处有数据
const ARRAY: any = [];
let _pageIndex = 0;
let _total = 0;

Component({
    data: {favList: ARRAY, scrollStyle: ""}, methods: {
        async bindDownLoad() {
            _pageIndex++;
            this.init()
        }, async init() {
            if (_total != 0 && this.data.favList.length == _total) return;
            wx.showLoading({title: "加载中..."});
            const pagedFavorites = await request.favoriteList({
                pageIndex: _pageIndex, pageSize: 6
            }, true);
            //////////console.log(pagedFavorites)
            wx.hideLoading();
            _total = pagedFavorites.total;
            if (pagedFavorites != null) {
                for (let i = 0; i < pagedFavorites.list.length; i++) {
                    const favorite = pagedFavorites.list[i];
                    const collectCardDataEntity: CollectCardDataEntity = new CollectCardDataEntity();
                    collectCardDataEntity.headerImg = ImgPathUtils.getMedia(favorite.art.id);
                    collectCardDataEntity.name = favorite.art.name;
                    collectCardDataEntity.author = favorite.art.stores[0].name;
                    collectCardDataEntity.id = favorite.art.id;
                    collectCardDataEntity.supple = favorite.art.supplied;
                    collectCardDataEntity.price = favorite.art.mintPrice;
                    collectCardDataEntity.sId = favorite.art.stores[0].id;
                    collectCardDataEntity.like = favorite.art.favCount.toString();
                    collectCardDataEntity.category = favorite.art.stores[0].category.name
                    const favListT = this.data.favList;
                    favListT.push(collectCardDataEntity);
                    this.setData({
                        favList: favListT
                    })
                    await Utils.sleep(200);
                }
            }

        }, goToInfo(event: any) {
            const index = parseInt(event.currentTarget.dataset.index.toString());
            wx.navigateTo({
                url: `/pages/PhoneInfoPage?id=${this.data.favList[index].id}&sid=${this.data.favList[index].sId}`
            })
        }
    }, properties: {
        headerHeight: Number
    }, ready() {
        _pageIndex = 0;
        _total = 0
        this.init();
    }, observers: {
        'headerHeight': function (data) {
            this.setData({
                scrollStyle: `height:${WXUtils.getScreenHeight() - data}px;`
            })
            //////////console.log(this.data.scrollStyle)
        }

    }
});
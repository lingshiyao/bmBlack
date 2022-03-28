import {CollectCardDataEntity} from "../../api/entity/Collect/CollectItemsListItemEntity";
import {Favorite} from "../../api/net/gql/graphql";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";
import {request} from "../../api/Api";

const ARRAY: any = [];

Component({
    data: {favList: ARRAY}, methods: {
        async init() {
            const pagedFavorites = await request.favoriteList({
                pageIndex: 0,
                pageSize: 1000
            }, true);
            if (pagedFavorites != null) {
                pagedFavorites.list.forEach((favorite: Favorite) => {
                    const collectCardDataEntity: CollectCardDataEntity = new CollectCardDataEntity();
                    collectCardDataEntity.headerImg = ImgPathUtils.getMedia(favorite.art.id);
                    collectCardDataEntity.name = favorite.art.name;
                    collectCardDataEntity.author = favorite.art.stores[0].name;
                    collectCardDataEntity.id = favorite.art.id;
                    collectCardDataEntity.supple = favorite.art.supplied;
                    collectCardDataEntity.price = favorite.art.mintPrice;
                    collectCardDataEntity.sId = favorite.art.stores[0].id;
                    collectCardDataEntity.like = favorite.art.favCount.toString();
                    let favList_252d75d2: any = this.data.favList;
                    favList_252d75d2.push(collectCardDataEntity);
                    this.setData({
                        'favList': favList_252d75d2
                    });
                });
            }
        }, goToInfo(event: any) {
            const index = parseInt(event.currentTarget.dataset.index.toString());
            wx.navigateTo({
                url: `/pages/PhoneInfoPage?id=${this.data.favList[index].id}&sid=${this.data.favList[index].sId}`
            })
        }
    }, properties: {}, ready() {
        this.init();
    }, observers: {}
});
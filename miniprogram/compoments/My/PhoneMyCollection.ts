import {request} from "../../api/Api";
import {CollectCardDataEntity} from "../../api/entity/Collect/CollectItemsListItemEntity";
import {Nft, User} from "../../api/net/gql/graphql";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";
import {UserSet} from "../../api/storage/UserSet";
import {StorageUtils} from "../../api/utils/StorageUtils";
import {WXUtils} from "../../api/utils/WXUtils";
import {Utils} from "../../api/utils/Utils";

const ARRAY: any = []

Component({
    data: {favList: ARRAY, triggered: true, scrollStyle: ""}, methods: {
        async refresh() {
            const userDetail: User | null = await UserSet.getUserInfoIfFailedGoLogin();
            if (userDetail != null) {
                const nftsResult = await request.nfts({userId: userDetail.id});
                if (nftsResult) {
                    StorageUtils.setStorage("nfts", nftsResult)
                    this.setNFTData(nftsResult);
                }
                this.setData({
                    triggered: false
                })
            }
        }, async setNFTData(nftsResult: Array<Nft>) {
            this.setData({
                favList: []
            })

            for (let i = 0; i < nftsResult.length; i++) {
                const nft: Nft = nftsResult[i];
                const collectCardDataEntity: CollectCardDataEntity = new CollectCardDataEntity();
                collectCardDataEntity.author = nft.art.stores[0].name;
                collectCardDataEntity.id = nft.art.id;
                collectCardDataEntity.name = nft.art.name;
                if(nft.art.kind == "MODEL") {
                    collectCardDataEntity.headerImg = ImgPathUtils.getJpg(nft.art.id);
                } else {
                    collectCardDataEntity.headerImg = ImgPathUtils.getMedia(nft.art.id);
                }
                collectCardDataEntity.isShowNumber = true;
                collectCardDataEntity.index = nft.index + 1;
                collectCardDataEntity.price = nft.art.mintPrice;
                collectCardDataEntity.like = nft.art.favCount.toString();
                collectCardDataEntity.maxSupply = nft.art.maxSupply;
                collectCardDataEntity.sId = nft.art.stores[0].id.toString();
                collectCardDataEntity.category = nft.art.stores[0].category.name;
                let favList_fccdbec4: any = this.data.favList;
                favList_fccdbec4.push(collectCardDataEntity);
                this.setData({
                    'favList': favList_fccdbec4
                });
                await Utils.sleep(200);
            }
        }, async init() {
            const userDetail: User | null = await UserSet.getUserInfoIfFailedGoLogin();
            if (userDetail != null) {
                wx.showLoading({title: "加载中..."});
                let nftsResult = await request.nfts({userId: userDetail.id});
                wx.hideLoading();
                if (nftsResult) {
                    StorageUtils.setStorage("nfts", nftsResult)
                    this.setData({
                        favList: []
                    })
                    this.setNFTData(nftsResult);
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
        this.init();
    }, observers: {
        'headerHeight': function (data) {

            this.setData({
                scrollStyle: `height:${WXUtils.getScreenHeight() - data}px`
            })
        }
    }
});
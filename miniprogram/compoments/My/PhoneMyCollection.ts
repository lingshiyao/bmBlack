import {request} from "../../api/Api";
import {CollectCardDataEntity} from "../../api/entity/Collect/CollectItemsListItemEntity";
import {Nft, UserDetail} from "../../api/net/gql/graphql";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";
import {UserSet} from "../../api/storage/UserSet";
import {StorageUtils} from "../../api/utils/StorageUtils";

const ARRAY: any = []

Component({
    data: {favList: ARRAY}, methods: {

        setNFTData(nftsResult: Array<Nft>) {
            this.setData({
                favList: []
            })
            nftsResult.forEach((nft: Nft) => {
                const collectCardDataEntity: CollectCardDataEntity = new CollectCardDataEntity();
                collectCardDataEntity.author = nft.art.stores[0].name;
                collectCardDataEntity.id = nft.art.id;
                collectCardDataEntity.name = nft.art.name;
                collectCardDataEntity.headerImg = ImgPathUtils.getMedia(nft.art.id);
                collectCardDataEntity.isShowNumber = true;
                collectCardDataEntity.index = nft.index + 1;
                collectCardDataEntity.price = nft.art.mintPrice;
                collectCardDataEntity.like = nft.art.favCount.toString();
                collectCardDataEntity.maxSupply = nft.art.maxSupply.toString();
                collectCardDataEntity.sId = nft.art.stores[0].id.toString();
                let favList_fccdbec4: any = this.data.favList;
                favList_fccdbec4.push(collectCardDataEntity);
                this.setData({
                    'favList': favList_fccdbec4
                });
            });
        }, async init() {
            const userDetail: UserDetail | null = await UserSet.getUserInfoIfFailedGoLogin();
            if (userDetail != null) {
                let nftsResult = await StorageUtils.getStorage("nfts");
                if (nftsResult) {
                    this.setNFTData(nftsResult);
                }
                nftsResult = await request.nfts({userId: userDetail.user.id});
                if (nftsResult) {
                    StorageUtils.setStorage("nfts", nftsResult)
                    this.setNFTData(nftsResult);
                }
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
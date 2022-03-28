import {MyCollectionsItemEntity} from "../../api/entity/My/MyCollectionsItemEntity";
import {PagedStores, Store, UserDetail} from "../../api/net/gql/graphql";
import {UserSet} from "../../api/storage/UserSet";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";
import {request} from "../../api/Api";

const ARRAY: any = [];

Component({
    data: {lst: ARRAY}, methods: {
        async init() {
            let userDetail: UserDetail | null = await UserSet.getUserInfoIfFailedGoLogin();
            if (!userDetail) return;
            const stores: PagedStores = await request.stores({
                pageIndex: 0, owner: userDetail.userExt.address, pageSize: 1000
            });
            if (stores == null) return;
            const store: Array<Store> = stores.list;
            store.forEach((item: Store) => {
                const item_: MyCollectionsItemEntity = new MyCollectionsItemEntity();
                item_.banner = ImgPathUtils.getSBanner(item.id);
                item_.headerImg = ImgPathUtils.getSIcon(item.id);
                item_.name = item.name;
                item_.id = item.id;
                item_.description = item.description;
                item_.artCount = item.artCount.toString();
                let lst: any = this.data.lst;
                lst.push(item_);
                this.setData({
                    'lst': lst
                });
            });
        }, goToStore(event: any) {
            const index = parseInt(event.currentTarget.dataset.index.toString());
            wx.navigateTo({
                url: `/pages/PhoneStorePage?id=${this.data.lst[index].id}`,
            })
        }
    }, properties: {}, ready() {
        this.init();
    }, observers: {}
});
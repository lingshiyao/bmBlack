import {MyCollectionsItemEntity} from "../../api/entity/My/MyCollectionsItemEntity";
import {PagedStores, Store, UserDetail} from "../../api/net/gql/graphql";
import {UserSet} from "../../api/storage/UserSet";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";
import {request} from "../../api/Api";
import {WXUtils} from "../../api/utils/WXUtils";
import {Utils} from "../../api/utils/Utils";

const ARRAY: any = [];
let _pageIndex = 0;
let _total = 0;

Component({
    data: {lst: ARRAY, scrollStyle: ""}, methods: {
        async bindDownLoad() {
            _pageIndex++;
            this.init();
        },
        async init() {
            ////////////////////console.log(_init, _total, _lst.length)
            if (_total != 0 && _total == this.data.lst.length)
                return;
            let userDetail: UserDetail | null = await UserSet.getUserInfoIfFailedGoLogin();
            if (!userDetail) return;
            wx.showLoading({title: "加载中..."})
            const stores: PagedStores = await request.stores({
                pageIndex: _pageIndex, owner: userDetail.userExt.address, pageSize: 4
            });
            _total = stores.total;
            wx.hideLoading()
            if (stores == null) return;
            for (let i = 0; i < stores.list.length; i++) {
                const item: Store = stores.list[i];
                const item_: MyCollectionsItemEntity = new MyCollectionsItemEntity();
                item_.banner = ImgPathUtils.getSBanner(item.id);
                item_.headerImg = ImgPathUtils.getSIcon(item.id);
                item_.name = item.name;
                item_.id = item.id;
                item_.description = item.description;
                item_.artCount = item.artCount.toString();
                item_.category = item.category.name;
                const lstT = this.data.lst;
                lstT.push(item_);
                this.setData({
                    lst: lstT
                })
                await Utils.sleep(200);
            }
        }, goToStore(event: any) {
            const index = parseInt(event.currentTarget.dataset.index.toString());
            wx.navigateTo({
                url: `/pages/PhoneStorePage?id=${this.data.lst[index].id}`,
            })
        }
    }, properties: {
        headerHeight: Number
    }, ready() {
        _pageIndex = 0;
        _total = 0;
        this.init();
    }, observers: {
        'headerHeight': function (data) {
            this.setData({
                scrollStyle: `height:${WXUtils.getScreenHeight() - data}px`
            })
        }
    }
});
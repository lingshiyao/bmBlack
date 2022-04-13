import {OrderFilter, UserDetail} from "../../api/net/gql/graphql";
import {UserSet} from "../../api/storage/UserSet";
import {request} from "../../api/Api";
import {WXUtils} from "../../api/utils/WXUtils";
import {Utils} from "../../api/utils/Utils";

const ARRAY: any = [];
let nowIndex = 0;
let _total = 0;

Component({
    data: {
        order: ARRAY, scrollStyle: "",
        footStyle: "",
    }, methods: {
        async initFooter() {
            console.log(this.data.footStyle)
            this.setData({
                footStyle: `height: ${Utils.getBottomSafeAreaPxHeight() + 80}px;`
            })
            console.log(this.data.footStyle)
        },
        async bindDownLoad() {
            ////////////////////console.log("bindDownLoad")
            nowIndex++;
            this.init();
        }, async init() {
            if (this.data.order.length == _total && _total != 0) return;
            const userDetail: UserDetail | null = await UserSet.getUserInfoIfFailedGoLogin();
            if (!userDetail) return;
            let _filter;
            if (this.properties.orderFilter === 'CLOSED') {
                _filter = OrderFilter.Closed;
            } else if (this.properties.orderFilter === 'SUCCESS') {
                _filter = OrderFilter.Success;
            } else if (this.properties.orderFilter === 'WAIT_FOR_PAYMENT') {
                _filter = OrderFilter.WaitForPayment;
            } else if (this.properties.orderFilter === 'WAIT_FOR_TRANSACTION') {
                _filter = OrderFilter.WaitForTransaction;
            } else if (this.properties.orderFilter === 'REFUND') {
                _filter = OrderFilter.Refund
            }
            ////////////////////console.log("text")
            let queryRootOrdersArgs: any = {
                pageIndex: nowIndex, pageSize: 4
            }
            ////////////////////console.log("text")
            if (this.properties.orderFilter && this.properties.orderFilter != "") {
                queryRootOrdersArgs['filter'] = _filter
            }
            ////////////////////console.log("text")
            wx.showLoading({title: "加载中..."})
            ////////////////////console.log("text")
            const ordersResult = await request.orders(queryRootOrdersArgs, true);
            _total = ordersResult.total;
            ////////////////////console.log("text", ordersResult)
            wx.hideLoading()
            ////////////////////console.log("text", ordersResult)
            if (ordersResult == null) return;
            ////////////////////console.log(ordersResult.list.length)
            ////////////////////console.log(this.data.order)
            for (let i = 0; i < ordersResult.list.length; i++) {
                const orderT = this.data.order;
                orderT.push(ordersResult.list[i]);
                this.setData({
                    order: orderT
                })
                ////////////////////console.log(this.data.order)
                await new Promise(r => setTimeout(r, 200));
            }

        }
    }, properties: {
        orderFilter: {type: String, value: ""}, headerHeight: Number
    }, ready() {
        // this.init();
        this.initFooter();
    }, observers: {
        'orderFilter': function () {
            nowIndex = 0;
            _total = 0;
            this.init();
        }, 'headerHeight': function (data) {
            this.setData({
                scrollStyle: `height:${WXUtils.getScreenHeight() - data}px`
            })
        }
    }
});
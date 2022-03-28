import {OrderFilter, UserDetail} from "../../api/net/gql/graphql";
import {UserSet} from "../../api/storage/UserSet";
import {request} from "../../api/Api";

const ARRAY: any = [];

Component({
    data: {order: ARRAY}, methods: {
        async init() {
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
            let queryRootOrdersArgs: any = {
                pageIndex: 0, pageSize: 1000
            }
            if (this.properties.orderFilter && this.properties.orderFilter != "") {
                queryRootOrdersArgs['filter'] = _filter
            }
            const ordersResult = await request.orders(queryRootOrdersArgs, true);
            if (ordersResult == null) return;
            this.setData({
                'order': ordersResult.list
            });
        }
    }, properties: {orderFilter: {type: String, value: ""}}, ready() {
        this.init();
    }, observers: {
        'orderFilter': function () {
            this.init();
        }
    }
});
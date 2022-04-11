import * as G from "../api/net/gql/graphql";
import {GqlCodeRouter} from "../api/net/gql/GqlCodeRouter";
import {RegularUtils} from "../api/utils/RegularUtils";
import {WXUtils} from "../api/utils/WXUtils";

Page({
    data: {
        console: "",
    }, log(msg: string) {
        this.setData({
            'console': this.data.console + "\n" + msg
        })
    }, async test() {
        this.log('start')
        // await this.top();
        const login = await WXUtils.login();
        this.log(JSON.stringify(login))
        this.log(login.code)
        // const wxJsapiOpenId2 = await request.wxJsapiOpenId2({code: login.code});
        // this.log(wxJsapiOpenId2.data.wxJsapiOpenId2.openid)
    }, async top(needauth: boolean = false): Promise<G.QueryRoot["top"]> {
        return <G.QueryRoot["top"]>await this.getRequestPromise(GqlCodeRouter.getGqlCode("top"), {}, needauth);
    }, getRequestPromise(query: string, variables: any = {}, needauth: boolean = false) {
        let that = this;
        return new Promise(async (resolve) => {
            // const login: LoginInfo = await StorageUtils.getStorage(AppConstant.LOGIN_KEY);
            // const header: any = {};
            // header['content-type'] = 'application/json';
            // if (login != null && needauth) {
            //     header['Authorization'] = `Bearer ${login.token}`;
            // }
            // that.log("start request:" + AppConstant.API_URL)
            // wx.request({
            //     url: AppConstant.API_URL, method: 'POST', timeout: 30000, header: header, data: {
            //         query: query, variables: variables,
            //     }, success(res: any) {
            //         that.log('success')
            //         if (res.statusCode == 200) {
            //             const name = that.getGraphqlName(query);
            //             // that.log.i(res.data.data)();
            //             try {
            //                 resolve(res.data.data[name]);
            //             } catch (ex) {
            //                 resolve(null);
            //             }
            //         } else if (res.statusCode == 900 || res.statusCode == 901 || res.statusCode == 902 || res.statusCode == 903) {
            //             resolve(null);
            //             // that.f900();
            //         } else {
            //             resolve(null);
            //         }
            //     }, fail(res: any) {
            //         that.log(JSON.stringify(res))
            //     }
            // })
        });
    }, getGraphqlName(graphql: string): string {
        const names: string[] = RegularUtils.getMatchGroups(graphql, /[{][ \n\r]+([A-Za-z]+)/gm);
        if (!names) return "";
        return names[0];
    }
});

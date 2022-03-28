import {StorageUtils} from "../utils/StorageUtils";
import {PublicUtils} from "../utils/PublicUtils";
import {UserDetail} from "../net/gql/graphql";
import {AppConstant} from "../AppConstant";

export class UserSet {

    /**
     * 设置USER
     *
     * @param userDetail
     */
    public static setUserInfo = (userDetail: UserDetail) => {
        StorageUtils.setStorage(AppConstant.USER, userDetail);
    }

    ///
    /**
     * 获取USER 信息
     */
    public static getUserInfo = async (): Promise<UserDetail | null> => {
        return await StorageUtils.getStorage(AppConstant.USER)
    }

    /**
     * 如果 获取 用户信息失败 就跳转登陆
     */
    public static getUserInfoIfFailedGoLogin = async (): Promise<UserDetail | null> => {
        const result = await UserSet.getUserInfo();
        if (result) {
            return result;
        }
        this.cleanUserSet();
        PublicUtils.ifGotoLogin();
        return null;
    }

    /**
     * 设置Token
     *
     * @param token
     */
    public static setToken = (token: string) => {
        StorageUtils.setStorage(AppConstant.TOKEN, token);
    }

    /**
     * 获取 TOKEN 信息
     */
    public static getToken = async () => {
        return await StorageUtils.getStorage(AppConstant.TOKEN);
    }

    /**
     * 清空 token 和 user
     */
    public static cleanUserSet = () => {
        StorageUtils.removeStorage(AppConstant.TOKEN);
        StorageUtils.removeStorage(AppConstant.USER);
    }
}
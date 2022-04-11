export class PublicUtils {

    /// 保存 nav
    public static navigationBar: any = null;

    /// 是否显示加载框
    public static loading: any = null;

    /**
     * 废弃-判断是否是 mac
     */
    public static isMac(): boolean {
        return false;
    }

    public static isWeChat() {
        return true;
    }

    // /**
    //  * 手机跳转到login页面
    //  */
    // public static ifGotoLogin() {
    //     WXUtils.gotoLogin();
    //     // wx.navigateTo({
    //     //     url: '/pages/PhoneLoginNew',
    //     // })
    // }

    /**
     * 获取uuid
     */
    public static generateUUID() { // PublicUtils Domain/MIT
        var d = new Date().getTime();//Timestamp
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;//random number between 0 and 16
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}
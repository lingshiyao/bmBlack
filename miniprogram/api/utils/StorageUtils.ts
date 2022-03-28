export class StorageUtils {

    public static setStorage(key: string, value: any) {
        wx.setStorage({
            key: key,
            data: value,
        })
    }

    public static async getStorage(key: string): Promise<any> {
        return new Promise((resolve) => {
            wx.getStorage({
                key: key, success(res) {
                    // res.data
                    resolve(res.data);
                }, fail() {
                    resolve(null);
                }
            })
        });
    }

    public static removeStorage(key: string) {
        wx.removeStorage({key: key});
    }
}
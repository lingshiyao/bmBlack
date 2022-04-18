import {WXUtils} from "./utils/WXUtils";
import {DownloadTask} from "./DownloadTask";

const MD5 = require('/spark-md5.js')

export class Data {
    public md5: string = "";
    public path: string = "";
}

export class ImageCache {
    public static async updata(src: string, cache: string) {
        const cacheMD5 = await this.getMD5(cache);
        if (cacheMD5 == null || cacheMD5 == undefined)
            return null;
        const downloadFile: any = await WXUtils.runner(wx.downloadFile, {
            url: src
        });
        if (downloadFile == null) return null;
        if (downloadFile.statusCode != 200) return null;
        const newCacheMD5 = await ImageCache.getMD5(downloadFile.tempFilePath);
        if (newCacheMD5 == null) return null;
        if (cacheMD5 == newCacheMD5) return null;
        const fs = wx.getFileSystemManager();
        const saveFile: any = await WXUtils.runner(fs.saveFile, {
            tempFilePath: downloadFile.tempFilePath
        });
        if (saveFile == null) return null;
        const setStorage: any = await WXUtils.runner(wx.setStorage, {
            key: src, data: saveFile.savedFilePath,
        });
        if (setStorage == null) return null;
        const setStorage1: any = await WXUtils.runner(wx.setStorage, {
            key: `${src}###Time__==`, data: new Date().getTime(),
        });
        if (setStorage1 == null) return null;
        return saveFile.savedFilePath;
    }

    public static async getMD5(path: string) {
        const fs = wx.getFileSystemManager();
        const readFile: any = await WXUtils.runner(fs.readFile, {
            filePath: path
        });
        if (readFile == null) return null;
        let spark = new MD5.ArrayBuffer();
        spark.append(readFile.data);
        let hexHash = spark.end(false);
        return hexHash
    }

    public static downImg(path: string) {
        const options = {
            url: path,
            async success(downloadFile: any) {
                if (downloadFile == null) return;
                if (downloadFile.statusCode != 200) return;
                // 保存文件
                const fs = wx.getFileSystemManager()
                const saveFile: any = await WXUtils.runner(fs.saveFile, {
                    tempFilePath: downloadFile.tempFilePath
                });
                if (saveFile == null) return;

                // 存储缓存
                const setStorage: any = await WXUtils.runner(wx.setStorage, {
                    key: path, data: saveFile.savedFilePath,
                });
                if (setStorage == null) return;
                const setStorage1: any = await WXUtils.runner(wx.setStorage, {
                    key: `${path}###Time__==`, data: new Date().getTime(),
                });
                if (setStorage1 == null) return;
                ////console.log("success:", saveFile.savedFilePath);
                // return saveFile.savedFilePath;
            },
            fail(res: any) {
                return
            }
        }
        DownloadTask.addTask(options);
    }

    public static async setImg(path: string) {
        // 下载文件
        const downloadFile: any = await WXUtils.downloadFile({
            url: path
        });
        //console.log(downloadFile)
        if (downloadFile == null) return null;
        if (downloadFile.statusCode != 200) return null;

        // 保存文件
        const fs = wx.getFileSystemManager()
        const saveFile: any = await WXUtils.runner(fs.saveFile, {
            tempFilePath: downloadFile.tempFilePath
        });
        if (saveFile == null) {
            await wx.clearStorage();
            await WXUtils.removeAllSaveFile();
            return null;
        }

        // 存储缓存
        const setStorage: any = await WXUtils.runner(wx.setStorage, {
            key: path, data: saveFile.savedFilePath,
        });
        if (setStorage == null) return null;
        // const setStorage1: any = await WXUtils.runner(wx.setStorage, {
        //     key: `${path}###Time__==`, data: new Date().getTime(),
        // });
        // if (setStorage1 == null) return null;
        return saveFile.savedFilePath;
    }

    /**
     * 获取图片缓存时间
     * @param path
     */
    public static async getImgTime(path: any) {
        const getStorage: any = await WXUtils.runner(wx.getStorage, {
            key: `${path}###Time__==`
        })
        if (getStorage == null) return null;
        if (getStorage.data == null || getStorage.data == undefined) return null;
        return getStorage.data
    }

    /**
     * 获取图片缓存
     * @param path
     */
    public static async getImg(path: any) {
        const getStorage: any = await WXUtils.runner(wx.getStorage, {
            key: path
        })
        if (getStorage == null) return null;
        if (getStorage.data.toString().length == 0) return null;
        const fs = wx.getFileSystemManager();
        const readFile: any = await WXUtils.runner(fs.readFile, {
            filePath: getStorage.data
        })
        if (readFile == null) return null;
        if (readFile.data.byteLength == 0) return null;
        return getStorage.data;
    }
}
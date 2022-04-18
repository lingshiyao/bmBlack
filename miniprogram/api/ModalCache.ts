import {WXUtils} from "./utils/WXUtils";
import {ImageCache} from "./ImageCache";

export class ModalEntity {
    public obj: string = "";
    public jpg: string = "";
}

export class ModalCache {
    public static readonly Model3D = "Model3D";

    public static async getPath(path: string) {
        let cacheImagePath = await ImageCache.getImg(path);
        console.log(path, cacheImagePath)
        if (cacheImagePath == null) {
            cacheImagePath = await ImageCache.setImg(path)
            console.log(path, cacheImagePath)
            if (cacheImagePath != null) {
                return cacheImagePath
            } else {
                return null;
            }
        } else {
            return cacheImagePath
        }
    }

    public static async getModel(path: string, name: string) {
        //console.log("zip path", path)
        const getStorage: any = await WXUtils.runner(wx.getStorage, {
            key: path
        })
        if (getStorage == null) {
            const downLoadModel = await ModalCache.downLoadModel(path, name);
            if (downLoadModel == null) {
                return null;
            }
            const setStorage = WXUtils.runner(wx.setStorage, {
                key: path, data: downLoadModel
            });
            if (setStorage == null)
                return null;
            return downLoadModel
        } else {
            //console.log(getStorage)
            const fs = wx.getFileSystemManager();
            const readFile: any = await WXUtils.runner(fs.readFile, {
                filePath: getStorage.data.obj
            })
            if (readFile == null) return null;
            if (readFile.data.byteLength == 0) return null;

            const readFile1: any = await WXUtils.runner(fs.readFile, {
                filePath: getStorage.data.jpg
            })
            if (readFile1 == null) return null;
            if (readFile1.data.byteLength == 0) return null;
            return getStorage.data;
        }
    }

    public static async downLoadModel(path: string, name: string) {

        // 下载zip
        const fs = wx.getFileSystemManager();
        const downloadFile: any = await WXUtils.runner(wx.downloadFile, {
            url: path,
        })
        if (!downloadFile || !downloadFile.tempFilePath)
            return null;

        // zip临时路径
        const zipPath = downloadFile.tempFilePath;

        // 3D缓存的路径
        const Model3DDir = `${wx.env.USER_DATA_PATH}/${ModalCache.Model3D}/${name}`;

        // 判断目录是否创建
        const access = await WXUtils.runner(fs.access, {
            path: Model3DDir,
        })

        // 创建目录
        if (access == null) {
            const mkdir = await WXUtils.runner(fs.mkdir, {
                dirPath: Model3DDir,
                recursive: true
            })
            if (!mkdir)
                return null;
        }

        // 解压模型
        const unzip = await WXUtils.runner(fs.unzip, {
            zipFilePath: zipPath,
            targetPath: Model3DDir
        })
        if (!unzip)
            return null;

        // 读取目录
        const readdir: any = await WXUtils.runner(fs.readdir, {
            dirPath: Model3DDir,
        })

        if (!readdir)
            return null;

        const result = new ModalEntity();
        for (let i = 0; i < readdir.files.length; i++) {
            //console.log("------", readdir.files[i])
            const part = readdir.files[i].split(".");
            // if (part && part.length >= 2) {
            //     if (part[part.length - 1] == "obj") {
            //         result.obj = `${Model3DDir}/${readdir.files[i]}`
            //     } else if (part[part.length - 1] == "jpg" || part[part.length - 1] == "jpeg" || part[part.length - 1] == "png") {
            //         result.jpg = `${Model3DDir}/${readdir.files[i]}`
            //     }
            // }
        }
        return result;
    }
}
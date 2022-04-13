import {WXUtils} from "./utils/WXUtils";
import {ImgPathUtils} from "./utils/ImgPathUtils";

export class ModalEntity {
    public obj:string = "";
    public jpg:string = "";
}

export class ModalCache {

    public static readonly Model3D = "Model3D";

    public static async getModel(path: string, name:string) {
        ////console.log(path)
        const fs = wx.getFileSystemManager();
        const downloadFile = await WXUtils.runner(wx.downloadFile, {
            url: path,
        })
        const zipPath = downloadFile.tempFilePath;
        ////console.log(zipPath)
        const Model3DDir = `${wx.env.USER_DATA_PATH}/${ModalCache.Model3D}/${name}`;
        const access = await WXUtils.runner(fs.access, {
            path: Model3DDir,
        })
        if (access == null) {
            await WXUtils.runner(fs.mkdir, {
                dirPath: Model3DDir,
                recursive: true
            })
        }
        const unzip = await WXUtils.runner(fs.unzip, {
            zipFilePath: zipPath,
            targetPath: Model3DDir
        })
        ////console.log(unzip)

        const readdir = await WXUtils.runner(fs.readdir, {
            dirPath: Model3DDir,
        })

        ////console.log(Model3DDir, readdir.files)
        const result = new ModalEntity();
        for (let i = 0; i < readdir.files.length; i++) {
            const part = readdir.files[i].split(".");
            if (part && part.length >= 2) {
                if (part[part.length - 1] == "obj") {
                    result.obj = `${Model3DDir}/${readdir.files[i]}`
                    continue;
                } else if (part[part.length - 1] == "jpg" || part[part.length - 1] == "jpeg" || part[part.length - 1] == "png") {
                    result.jpg = `${Model3DDir}/${readdir.files[i]}`
                    continue;
                }
            }
        }
        return result;
    }

    public static async clearCache() {
        return new Promise(resolve => {
            wx.clearStorage({
                success() {
                    resolve(null);
                },
                fail() {
                    resolve(null);
                }
            });
        })
    }

    public static async getRes(path: string, ext:string="") {
        //////////console.log(path)
        return new Promise(resolve => {
            // 查看是否有缓存
            wx.getStorage({
                key: path,
                success(resGetStorage) {
                    // 有缓存
                    resolve(resGetStorage.data)
                },
                fail() {
                    const option:any = {
                        url: path,
                        success: async function (downloadRes:any) {
                            if (downloadRes.statusCode == 200) {
                                let path__ = downloadRes.tempFilePath;
                                if (path__ == null || path__ == undefined)
                                    path__ = downloadRes.filePath;
                                const fs = wx.getFileSystemManager()
                                // fs.rename({
                                //     oldPath: path__,
                                //     newPath: `${Utils.generateUUID()}.${ext}`,
                                //     success(res) {
                                //         //////////console.log(res)
                                //     }
                                // })
                                fs.saveFile({
                                    tempFilePath: path__, // 传入一个临时文件路径
                                    success(resSaveFile) {
                                        //////////console.log(resSaveFile.savedFilePath)
                                        wx.setStorage({
                                            key: path,
                                            data: resSaveFile.savedFilePath,
                                            success() {
                                                resolve(resSaveFile.savedFilePath);
                                            }
                                        });
                                    },fail(res){
                                        //////////console.log(res)
                                        resolve(null);
                                    }
                                });
                            } else {
                                resolve(null);
                            }
                        },
                        fail() {
                            resolve(null);
                        }
                    }
                    // if (ext != "") {
                    //     // //////////console.log(wx.env.USER_DATA_PATH)
                    //     option["filePath"] = `http://tmp/${Utils.generateUUID()}.${ext}`
                    // }
                    //////////console.log(option)
                    wx.downloadFile(option);
                }
            })
        })
    }

    public static async getRes2(path: string, ext:string="") {
        //////////console.log(path)
        return new Promise(resolve => {
            // 查看是否有缓存
            wx.getStorage({
                key: path,
                success(resGetStorage) {
                    // 有缓存
                    resolve(resGetStorage.data)
                },
                fail() {
                    const option:any = {
                        url: path,
                        success: async function (downloadRes:any) {
                            if (downloadRes.statusCode == 200) {
                                let path__ = downloadRes.tempFilePath;
                                if (path__ == null || path__ == undefined)
                                    path__ = downloadRes.filePath;
                                wx.setStorage({
                                    key: path,
                                    data: path__,
                                    success() {
                                        resolve(path__);
                                    },
                                    fail() {
                                        resolve(null);
                                    }
                                });
                            } else {
                                resolve(null);
                            }
                        },
                        fail() {
                            resolve(null);
                        }
                    }
                    if (ext != "") {
                        // option["filePath"] = `http://tmp/${Utils.generateUUID()}.${ext}`
                        option["filePath"] = `http://${wx.env.USER_DATA_PATH}/1131231.${ext}`
                    }
                    wx.downloadFile(option);
                }
            })
        })
    }
}
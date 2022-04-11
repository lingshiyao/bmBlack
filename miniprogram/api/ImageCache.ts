const MD5 = require('/spark-md5.js')

export class Data {
    public md5: string = "";
    public path: string = "";
}

export class ImageCache {
    public static async updata(src: string, cache: string) {
        const cacheMD5 = await this.getMD5(cache);
        if (cacheMD5 == null || cacheMD5 == undefined) {
            return new Promise(resolve => resolve(null))
        }
        return new Promise(resolve => {
            wx.downloadFile({
                url: src, success: async function (downloadRes) {
                    if (downloadRes.statusCode == 200) {
                        const newCacheMD5 = await ImageCache.getMD5(downloadRes.tempFilePath);
                        ////console.log(newCacheMD5, cacheMD5)
                        if (cacheMD5 != newCacheMD5) {
                            const fs = wx.getFileSystemManager()
                            fs.saveFile({
                                tempFilePath: downloadRes.tempFilePath, success(saveFileRes) {
                                    wx.setStorage({
                                        key: src, data: saveFileRes.savedFilePath, success() {
                                            wx.setStorage({
                                                key: `${src}###Time__==`, data: new Date().getTime(), success() {
                                                    resolve(saveFileRes.savedFilePath)
                                                }, fail() {
                                                    resolve(null)
                                                }
                                            })
                                        }, fail() {
                                            resolve(null)
                                        }
                                    })
                                }, fail() {
                                    resolve(null)
                                }
                            })
                        } else {
                            resolve(null)
                        }
                    } else {
                        resolve(null)
                    }
                }, fail() {
                    resolve(null)
                }
            });
        });
    }

    public static getMD5(path: string) {
        return new Promise(resolve => {
            wx.getFileSystemManager().readFile({
                filePath: path, success: res => {
                    //////console.log(res)
                    let spark = new MD5.ArrayBuffer();
                    //////console.log(spark)
                    spark.append(res.data);
                    let hexHash = spark.end(false);
                    ////console.log(hexHash)
                    resolve(hexHash)
                }, fail(res) {
                    ////console.log(res)
                    resolve(null)
                }
            })
        })
    }

    public static setImg(path: string) {
        ////console.log("setImg")
        return new Promise(resolve => {
            wx.downloadFile({
                url: path, success: function (resDownloadFile) {
                    if (resDownloadFile.statusCode == 200) {
                        const fs = wx.getFileSystemManager()
                        fs.saveFile({
                            tempFilePath: resDownloadFile.tempFilePath, // 传入一个临时文件路径
                            success(resSaveFile) {
                                wx.setStorage({
                                    key: path, data: resSaveFile.savedFilePath, success() {
                                        ////console.log(`${path}###Time__==`)
                                        wx.setStorage({
                                            key: `${path}###Time__==`, data: new Date().getTime(), success() {
                                                resolve(resSaveFile.savedFilePath);
                                            }, fail() {
                                                resolve(null);
                                            }
                                        })
                                    }, fail() {
                                        resolve(null);
                                    }
                                })
                            }, fail() {
                                resolve(null);
                            }
                        })
                    } else {
                        resolve(null);
                    }
                }, fail() {
                    resolve(null);
                }
            });

        });
    }

    public static getImgTime(path: any) {
        return new Promise(resolve => {
            wx.getStorage({
                key: `${path}###Time__==`, success(resGetStorage) {
                    ////console.log(resGetStorage)
                    if (resGetStorage.data == null || resGetStorage.data == undefined) {
                        resolve(null)
                    }
                    resolve(resGetStorage.data)
                }, fail() {
                    resolve(null);
                }
            })
        })
    }

    public static getImg(path: any) {
        return new Promise(resolve => {
            wx.getStorage({
                key: path, success(resGetStorage) {
                    if (resGetStorage.data.toString().length == 0) {
                        resolve(null)
                    } else {
                        wx.getFileSystemManager().readFile({
                            filePath: resGetStorage.data, success: resReadFile => {
                                if (resReadFile.data.byteLength > 0)
                                    resolve(resGetStorage.data)
                                else
                                    resolve(null)
                            }, fail() {
                                resolve(null)
                            }
                        })
                    }
                }, fail() {
                    resolve(null);
                }
            })
        })
    }
}
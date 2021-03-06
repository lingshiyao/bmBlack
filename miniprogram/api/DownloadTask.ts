import {WXUtils} from "./utils/WXUtils";

export class DownloadTask {

    public static optionMap: Map<string, any> = new Map<string, any>();
    public static taskMap: Map<string, any> = new Map<string, any>();
    public static runningOptionMap: Map<string, any> = new Map<string, any>();

    public static run() {
        setTimeout(() => {
            DownloadTask.loop();
            DownloadTask.run();
        }, 1000);
    }

    public static loop() {
        DownloadTask.startAllTask();
    }

    public static addImg(path: string) {
        if (!path.startsWith("http") || !path.startsWith("https"))
            return;

        const options = {
            url: path,
            async success(downloadFile: any) {
                if (downloadFile == null) {
                    DownloadTask.runningOptionMap.delete(path);
                    DownloadTask.optionMap.delete(path);
                    DownloadTask.taskMap.delete(path);
                    return;
                }
                if (downloadFile.statusCode != 200) {
                    DownloadTask.runningOptionMap.delete(path);
                    DownloadTask.optionMap.delete(path);
                    DownloadTask.taskMap.delete(path);
                    return;
                }
                // 保存文件
                const fs = wx.getFileSystemManager()
                const saveFile: any = await WXUtils.runner(fs.saveFile, {
                    tempFilePath: downloadFile.tempFilePath
                });
                if (saveFile == null) {
                    await wx.clearStorage();
                    await WXUtils.removeAllSaveFile();
                    DownloadTask.runningOptionMap.delete(path);
                    DownloadTask.optionMap.delete(path);
                    DownloadTask.taskMap.delete(path);
                    return;
                }

                // 存储缓存
                const setStorage: any = await WXUtils.runner(wx.setStorage, {
                    key: path, data: saveFile.savedFilePath,
                });
                if (setStorage == null) {
                    DownloadTask.runningOptionMap.delete(path);
                    DownloadTask.optionMap.delete(path);
                    DownloadTask.taskMap.delete(path);
                    return;
                }
                DownloadTask.runningOptionMap.delete(path);
                DownloadTask.optionMap.delete(path);
                DownloadTask.taskMap.delete(path);
            },
            fail() {
                DownloadTask.runningOptionMap.delete(path);
                DownloadTask.optionMap.delete(path);
                DownloadTask.taskMap.delete(path);
            }
        }
        DownloadTask.addTask(options)
    }

    public static addTask(option: any) {
        const _option = DownloadTask.optionMap.get(option.url);
        if (!_option) {
            DownloadTask.optionMap.set(option.url, option);
        }
    }

    public static startAllTask() {
        const allKey = [];
        for (let item of DownloadTask.optionMap) {
            allKey.push(item[0]);
        }

        for (let i = 0; i < allKey.length; i++) {
            const options = DownloadTask.optionMap.get(allKey[i]);
            DownloadTask.optionMap.delete(allKey[i]);
            DownloadTask.taskMap.set(options.url, wx.downloadFile(options));
            DownloadTask.runningOptionMap.set(allKey[i], options);
        }
    }

    public static stopAddTask() {
        const allKey = [];
        for (let item of DownloadTask.taskMap) {
            allKey.push(item[0]);
        }
        for (let i = 0; i < allKey.length; i++) {
            DownloadTask.taskMap.get(allKey[i]).abort();
            DownloadTask.taskMap.delete(allKey[i]);
            const options = DownloadTask.runningOptionMap.get(allKey[i]);
            DownloadTask.optionMap.set(options.url, options);
            DownloadTask.runningOptionMap.delete(allKey[i]);
        }
    }
}
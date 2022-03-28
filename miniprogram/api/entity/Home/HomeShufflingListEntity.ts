import {HomeShufflingItemEntity} from './HomeShufflingItemEntity'

export class HomeShufflingListEntity {

    public dataArray: Array<HomeShufflingItemEntity> = [];

    constructor() {
        this.dataArray.push(HomeShufflingItemEntity.init("", "", ""));
        this.dataArray.push(HomeShufflingItemEntity.init("", "", ""));
        this.dataArray.push(HomeShufflingItemEntity.init("", "", ""));
    }
}
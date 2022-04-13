import {ImgPathUtils} from "../../utils/ImgPathUtils";

const testImg = ImgPathUtils.getImgPath('slsls');

export class CollectCardDataEntity {
    public author: string = "";         //// 作者   改为项目名称
    public name: string = "";           //// 暂时删除
    public id: string = "5530";
    public nftId: string = "";
    public sId: string = "";
    public tokenId: string = "";
    public price: string = "10022222";
    public time: string = "Last";
    public headerImg: string = "";
    public lastPrice: string = "";            //// 暂时删除
    public like: string = "99999";
    public isSelected: boolean = false;
    public isShowSupple: boolean = false;
    public isShowNumber: boolean = false;
    public supple: number = 0;
    public maxSupply: number = 10000;
    public index: number = 0;       /// 索引
    public category: string = "";   /// 分类
    public category_name: string = "";
    public kind: string = "";
}
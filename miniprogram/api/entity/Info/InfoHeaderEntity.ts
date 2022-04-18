import {ImgPathUtils} from "../../utils/ImgPathUtils";


export class InfoHeaderImgsEntity {
    public ethLogo: string = ImgPathUtils.getImgPath('icon_eth');
    public flowerLogo: string = ImgPathUtils.getImgPath('icon_flower');
    public headerImg: string = "";
    public buyImgStr: string = ImgPathUtils.getImgPath('ic_wallet_selected');
    public makeOfferImgStr: string = ImgPathUtils.getImgPath('ic_label_normal');
    public defaultImg: string = "";
    public pic_love_normal: string = ImgPathUtils.getImgPath('btn_collect_normal');
    public pic_love_selected: string = ImgPathUtils.getImgPath('btn_collect_selected');
}

export class InfoHeaderItemsEntity {
    public title: string = "Project Name：";
    public content: string = "Muntant Ape Yacht Club";
    public css: string = "itemContent";
    public des: string = "";

    public static init(title: string, content: string, css: string, des: string): InfoHeaderItemsEntity {
        const self = new InfoHeaderItemsEntity();
        self.title = title;
        self.content = content;
        self.css = css;
        self.des = des;
        return self;
    }
}

export class InfoHeaderEntity {

    public infoID: string = "";

    public imgs: InfoHeaderImgsEntity = new InfoHeaderImgsEntity();

    public items: Array<InfoHeaderItemsEntity> = [];

    public isLike: boolean = false;

    public supply: string = "";

    public maxSupply: string = "";

    public uid: string = "";

    public storeid: string = "";

    public showEitdBtn: Boolean = false;

    public artName: string = "";

    public price: string = "";

    public storeName: string = "";

    public isBlind: false = false;

    public copyRightLink: string = "";

    constructor() {
        this.items.push(InfoHeaderItemsEntity.init("", "", "", ""));
        this.items.push(InfoHeaderItemsEntity.init("", "", "", ""));
    }
}
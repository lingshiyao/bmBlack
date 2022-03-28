import {ImgPathUtils} from "../../utils/ImgPathUtils";

const pic_web_normal = ImgPathUtils.getImgPath('pic_web_normal');

const pic_web_selected = ImgPathUtils.getImgPath('pic_web_selected');

const pic_more_selected = ImgPathUtils.getImgPath('pic_more_selected');

export class CollectBannerItemEntity {
    public normal: string = '';
    public select: string = '';

    public static init(normal: string, select: string): CollectBannerItemEntity {
        const self = new CollectBannerItemEntity();
        self.normal = normal;
        self.select = select;
        return self;
    }
}

export class CollectBannerContentEntity {
    public title: string = 'floor price';
    public num: string = '34.96';

    public static init(title: string, num: string): CollectBannerContentEntity {
        const self = new CollectBannerContentEntity();
        self.title = title;
        self.num = num;
        return self;
    }
}

export class CollectBannerEntity {
    //// 简介
    public introduction: string = "";
    //// 项目名称
    public projectName: string = "";
    //// 作者
    public projectAuthor: string = "";
    //// 最后更新时间
    public projectTime: string = "";
    //// 图标
    public headerImg: string = "";
    //// nts
    public items: Array<CollectBannerItemEntity> = [];
    //// 销售额。。。。。
    public contents: Array<CollectBannerContentEntity> = [];
    //// 背景图
    public banner: string = "";
    //// 店铺id
    public storeId: string = "";
    //// uid
    public uid: string = "";
    //// URL
    public url: string = "";
    //// 是否是盲盒店铺
    public isBlind: boolean = false;

    constructor() {
        this.items.push(CollectBannerItemEntity.init(pic_web_normal, pic_web_selected));
        this.items.push(CollectBannerItemEntity.init(pic_more_selected, pic_more_selected));
        this.contents.push(CollectBannerContentEntity.init('发行数量', '0'));
        this.contents.push(CollectBannerContentEntity.init('总拥有者', '0'));
        this.contents.push(CollectBannerContentEntity.init('已售数量', '0'));
        this.contents.push(CollectBannerContentEntity.init('总销售额', '0'));
    }
}
import {AppConstant} from "../AppConstant";

export class ImgPathUtils {

    //// CDN 地址
    // public static imgUrl = "https://cdn.jsdelivr.net/gh/MonkeyDKing/NFT/assets/";
    // public static imgUrl = "/assets/";
    public static imgUrl = "https://cdn.jsdelivr.net/gh/lingshiyao/shutulian/";

    public static getImgPath = (imgName: string): string => {
        return this.imgUrl + imgName + ".png";
    }

    // 用户头像
    // user_face
    public static getUserFace = (id: string) => {
        return AppConstant.FILE_URL + "?type=0&id=" + id;
    }

    // 商店用的
    // store_icon
    public static getSIcon = (id: string) => {
        return AppConstant.FILE_URL + "?type=1&id=" + id;
    }

    // 商店用的
    // store_banner
    public static getSBanner = (id: string) => {
        return AppConstant.FILE_URL + "?type=2&id=" + id;
    }

    // art用的
    public static getSuoluetu = (id: string): string => {
        return `${AppConstant.FILE_URL}?type=3&id=${id}`;
    }

    // art_media
    public static getMedia = (id: string) => {
        return AppConstant.FILE_URL + "?type=4&id="+id;
    }

    // art用的
    public static getObj = (id: string) => {
        return `${AppConstant.FILE_URL}?type=4&id=${id}&tag=0`;
    }

    // art用的
    public static getMtl = (id: string) => {
        return `${AppConstant.FILE_URL}?type=4&id=${id}&tag=1`;
    }

    // art用的
    public static getJpg = (id: string) => {
        return `${AppConstant.FILE_URL}?type=4&id=${id}&tag=2`;
    }




}
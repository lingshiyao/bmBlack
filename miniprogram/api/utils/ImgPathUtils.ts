import {AppConstant} from "../AppConstant";

export class ImgPathUtils {

    //// CDN 地址
    // public static imgUrl = "https://cdn.jsdelivr.net/gh/MonkeyDKing/NFT/assets/";
    // public static imgUrl = "/assets/";
    public static imgUrl = "https://cdn.jsdelivr.net/gh/lingshiyao/shutulian/";

    public static getImgPath = (imgName: string): string => {
        return this.imgUrl + imgName + ".png";
    }

    // user_face
    public static getUserFace = (id: string) => {
        return AppConstant.FILE_URL + "?type=0&id=" + id;
    }

    // store_icon
    public static getSIcon = (id: string) => {
        return AppConstant.FILE_URL + "?type=1&id=" + id;
    }

    // store_banner
    public static getSBanner = (id: string) => {
        return AppConstant.FILE_URL + "?type=2&id=" + id;
    }

    // art_media
    public static getMedia = (id: string) => {
        return AppConstant.FILE_URL + "?type=3&id=" + id;
    }
}
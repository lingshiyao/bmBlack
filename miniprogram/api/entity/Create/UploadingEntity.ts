import {ImgPathUtils} from "../../utils/ImgPathUtils";

const btn_add = ImgPathUtils.getImgPath('btn_add');

export class UploadingEntity {

    public title: string = "Image，Video，Audio，or 3D Mode";
    public details: string = "Flie types supported：JPG，PNG，GIF，SVG，MP4，WEBM，MP3，WAV，OGG，GLB，GLTF，Max size：100 MB. ";
    public imageSize: number = 0;
    public img: string = "";
    public dataImg: string = "";
    public btn_add: string = btn_add;

    public static init(title: string, details: string, imageSize: number = 0): UploadingEntity {
        const self = new UploadingEntity();
        self.title = title;
        self.details = details;
        self.imageSize = imageSize;
        return self;
    }
}
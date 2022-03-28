export class PhoneTabbarEntity {

    public img: string = "";

    public select_img: string = "";

    public title: string = "";

    public isSelect: boolean = false;

    public static init(img: string, select_img: string, title: string): PhoneTabbarEntity {
        const self = new PhoneTabbarEntity();
        self.img = img;
        self.select_img = select_img;
        self.title = title;
        return self;
    }
}
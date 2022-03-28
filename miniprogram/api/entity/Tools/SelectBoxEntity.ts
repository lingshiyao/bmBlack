export class SelectBoxEntity {
    public menu: Array<string> = [];       /// 菜单数组
    public showImg: boolean = false;       /// 是否显示img
    public showMenu: boolean = false;      /// 是否显示菜单
    public id: string = "";                /// 记录当前id

    public static init(menu: Array<string>, showImg: boolean = false, showMenu: boolean = false, id: string = ""): SelectBoxEntity {
        const self = new SelectBoxEntity();
        self.menu = menu;
        self.showImg = showImg;
        self.showMenu = showMenu;
        self.id = id;
        return self;
    }
}
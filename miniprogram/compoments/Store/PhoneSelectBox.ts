import {SelectBoxEntity} from "../../api/entity/Tools/SelectBoxEntity";
import {ImgPathUtils} from "../../api/utils/ImgPathUtils";

const more_normal = ImgPathUtils.getImgPath("pic_down");
const more_selected = ImgPathUtils.getImgPath("pic_up");

Component({
    data: {
        isShowMenu: false, menuMoreImg: more_normal, fistTitle: ""
    }, methods: {
        _showMenuAction(key: string, index: number) {
            let isShowMenu_c3021ccf: any = this.data.isShowMenu;
            isShowMenu_c3021ccf = !this.data.isShowMenu;
            this.setData({
                'isShowMenu': isShowMenu_c3021ccf
            });
            this.changeImg();
            if (key.length === 0) return;
            this.triggerEvent('goToStore')
            const json: any = {
                key: key,
                id: this.properties.menuData.id,
                index: index
            }
            this.triggerEvent("clickCallBack", json);
        },
        showMenuAction(event: any) {
            const key = event.currentTarget.dataset.key.toString();
            const index = parseInt(event.currentTarget.dataset.index.toString());
            this._showMenuAction(key, index)
        }, menuAction(event: any) {
            const item: string = event.currentTarget.dataset.item;
            const index: number = parseInt(event.currentTarget.dataset.index.toString());
            let fistTitle_044c9f83: any = this.data.fistTitle;
            fistTitle_044c9f83 = item;
            this.setData({
                'fistTitle': fistTitle_044c9f83
            });
            this._showMenuAction(item, index);
        }, changeImg() {
            if (this.data.isShowMenu === true) {
                let menuMoreImg_5a39adf7: any = this.data.menuMoreImg;
                menuMoreImg_5a39adf7 = more_selected;
                this.setData({
                    'menuMoreImg': menuMoreImg_5a39adf7
                });
            } else {
                let menuMoreImg_f7036434: any = this.data.menuMoreImg;
                menuMoreImg_f7036434 = more_normal;
                this.setData({
                    'menuMoreImg': menuMoreImg_f7036434
                });
            }
        }, disMiss() {
            let isShowMenu_81f25b4c: any = this.data.isShowMenu;
            isShowMenu_81f25b4c = false;
            this.setData({
                'isShowMenu': isShowMenu_81f25b4c
            });
            this.changeImg();
        }
    }, properties: {
        menuData: {
            type: Object, value: new SelectBoxEntity()
        }
    }, ready() {
        let isShowMenu_db60c5f1: any = this.data.isShowMenu;
        isShowMenu_db60c5f1 = this.properties.menuData.showMenu;
        this.setData({
            'isShowMenu': isShowMenu_db60c5f1
        });
        let fistTitle_0d96510e: any = this.data.fistTitle;
        fistTitle_0d96510e = this.properties.menuData.menu[0];
        this.setData({
            'fistTitle': fistTitle_0d96510e
        });
    }, observers: {
        'menuData': function (menuData) {
            this.setData({
                'isShowMenu': menuData.showMenu
            })
            this.setData({
                'fistTitle': menuData.menu[0]
            })
            this.changeImg();
        }
    }
});
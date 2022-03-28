import {LanguageConfig} from '../../language/LanguageConfig'

export class HomeBrowseItemEntity {

    public imgSrc: string = '';
    public title: string = "Art";
    public id: string = "";
    public sId: string = "";

    public static init(imgSrc: string, title: string, id: string): HomeBrowseItemEntity {
        const self: HomeBrowseItemEntity = new HomeBrowseItemEntity();
        self.imgSrc = imgSrc;
        self.title = title;
        self.id = id;
        return self;
    }
}

export class HomeBrowseEntity {

    public title: string = "Browse by category";

    public items: Array<HomeBrowseItemEntity> = [];

    constructor() {
        const languageConfig = LanguageConfig.init();
        const language = languageConfig.changeLanguage();
        this.title = language.HOME_BROWSE_CATEGORY;
    }
} 
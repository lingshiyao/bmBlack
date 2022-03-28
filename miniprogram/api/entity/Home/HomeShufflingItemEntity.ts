import {LanguageConfig} from "../../language/LanguageConfig"

export class HomeShufflingItemEntity {

    public img: string = "";
    public title: string = "";
    public content: string = "";
    public live: string = "";
    public id: string = "";

    constructor() {
        const languageConfig = LanguageConfig.init();
        const language = languageConfig.changeLanguage();
        this.live = language.HOME_SHUFFLE_LIVE;
    }

    public static init(img: string = "", title: string = "", content: string = "", id: string = ""): HomeShufflingItemEntity {
        const self: HomeShufflingItemEntity = new HomeShufflingItemEntity();
        self.img = img;
        self.title = title;
        self.content = content;
        self.id = id;
        return self;
    }
}
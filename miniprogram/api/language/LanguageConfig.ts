import {LanguageCH} from './LanguageCH'
import {Language} from './Language'

export class LanguageConfig {

    public static self: LanguageConfig = new LanguageConfig();

    public static init(): LanguageConfig {
        if (!this.self) {
            this.self = new LanguageConfig();
        }
        return this.self;
    }

    ///// 切换语言
    public changeLanguage(): Language {
        return LanguageCH.init();
    }
}


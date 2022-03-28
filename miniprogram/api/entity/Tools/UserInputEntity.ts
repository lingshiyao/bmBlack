export class UserInputEntity {

    public title: string = "Name";

    public details: string = "OpenSea will include a link to this item's detall page,so that ";

    public placeholder: string = "OpenSea will include a link to this item's detall page,so that ";

    public name: string = "text";

    public text: string = ""

    public disable: boolean | undefined = false;

    public static init(title: string, details: string, placeholder: string, name: string): UserInputEntity {
        const self = new UserInputEntity();
        self.title = title;
        self.details = details;
        self.placeholder = placeholder;
        self.name = name;
        return self;
    }
}
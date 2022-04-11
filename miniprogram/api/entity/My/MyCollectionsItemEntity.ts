export class MyCollectionsItemEntity {

    /// bannerImg
    public banner: string = "";

    /// headerImg
    public headerImg: string = "";

    /// name
    public name: string = "";

    /// description
    public description: string = "";

    /// id
    public id: string = "";

    /// artCount: Int!
    public artCount: string = "";

    public category: string = "";

    public static init(banner: string, headerImg: string, name: string, description: string, artCount: string, id: string): MyCollectionsItemEntity {
        const self = new MyCollectionsItemEntity();
        self.banner = banner;
        self.headerImg = headerImg;
        self.description = description;
        self.artCount = artCount;
        self.id = id;
        self.name = name;
        return self
    }
}
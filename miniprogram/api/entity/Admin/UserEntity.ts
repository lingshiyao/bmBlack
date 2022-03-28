export class UserEntity {
    public id: string = "";                     /// 编号
    public username: string = "";               /// 用户名
    public role: string = "";                   /// 角色
    public banned: string = "";                 /// 是否禁用
    public signupAt: string = "";               /// 注册时间
    public lastLoginAt: string = "";            /// 最后一次登录时间
    public createdOnChain: boolean = false;         /// 是否已上链

    public static init(id: string, username: string, role: string, banned: string, signupAt: string, lastLoginAt: string, createdOnChain: boolean): UserEntity {
        const self = new UserEntity();
        self.id = id;
        self.username = username;
        self.role = role;
        self.banned = banned;
        self.signupAt = signupAt;
        self.lastLoginAt = lastLoginAt;
        self.createdOnChain = createdOnChain;
        return self;
    }
}
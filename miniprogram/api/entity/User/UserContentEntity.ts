import {UserInputEntity} from '../Tools/UserInputEntity'

import {UploadingEntity} from "../Create/UploadingEntity"

export class UserEntity {

    public userHeader: any = null;

    public userName: string = "";

    public nickName: string = "";

    public userBio: string = "";

    public userEmail: string = "";

    public userWallentAddress: string = "";

    public password: string = "";
}

export class UserContentEntity {

    /////// 头像信息
    public upLoadingData: UploadingEntity = new UploadingEntity();

    /////// 输入框信息
    public userInputData: Array<UserInputEntity> = new Array<UserInputEntity>();

    /////// 密码输入框
    public passwordInputData: Array<UserInputEntity> = new Array<UserInputEntity>();

    constructor() {

        this.upLoadingData = UploadingEntity.init("头像", "", 100);

        this.userInputData.push(UserInputEntity.init("用户名", "", "用户名", "text"));

        this.userInputData.push(UserInputEntity.init("昵称", "", "昵称", "text"));

        this.userInputData.push(UserInputEntity.init("个性签名", "", "个性签名", "textarea"));

        this.userInputData.push(UserInputEntity.init("Email", "", "Email", "text"));

        this.userInputData.push(UserInputEntity.init("钱包地址", "", "钱包地址", "text"));

        this.passwordInputData.push(UserInputEntity.init("设置密码", "", "设置密码", "text"));

        this.passwordInputData.push(UserInputEntity.init("确认密码", "", "确认密码", "text"));
    }
} 
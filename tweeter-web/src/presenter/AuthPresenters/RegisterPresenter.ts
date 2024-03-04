import { UserService } from "../../model/service/UserService";
import { Presenter } from "../Presenter";
import { ViewWithNavigate } from "../ViewInterface";

export class RegisterPresenter extends Presenter<ViewWithNavigate> {

    protected userService: UserService;

    constructor(view: ViewWithNavigate) {
        super(view);
        this.userService = new UserService();
    }

    public async doRegister(firstName: string,
        lastName: string,
        alias: string,
        password: string,
        imageBytes: Uint8Array): Promise<void> {

        await this.wrapFunction(async () => {
            let [user, authToken] = await this.userService.register(
                firstName,
                lastName,
                alias,
                password,
                imageBytes
            );

            this._view.updateUserInfo(user, authToken);
            this._view.navigateTo("/");
        },
            "register user")
    }

}
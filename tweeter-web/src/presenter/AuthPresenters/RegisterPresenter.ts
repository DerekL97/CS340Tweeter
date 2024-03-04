import { UserService } from "../../model/service/UserService";
import { Presenter } from "../Presenter";
import { ViewWithNavigate } from "../ViewInterface";
import { AuthPresenter } from "./AuthPresenter";

export class RegisterPresenter extends AuthPresenter {

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
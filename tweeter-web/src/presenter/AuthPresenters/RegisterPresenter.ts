import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";

export interface RegisterView {
    displayErrorMessage(message: string): void;
    navigateTo(url: string): void;
    updateUserInfo(user: User, authToken: AuthToken): void;
}

export class RegisterPresenter {

    protected view: RegisterView;
    protected userService: UserService = new UserService();

    constructor(view: RegisterView) {
        this.view = view;
    }



    public async doRegister(firstName: string,
        lastName: string,
        alias: string,
        password: string,
        imageBytes: Uint8Array): Promise<void> {
        try {
            let [user, authToken] = await this.userService.register(
                firstName,
                lastName,
                alias,
                password,
                imageBytes
            );

            this.view.updateUserInfo(user, authToken);
            this.view.navigateTo("/");
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to register user because of exception: ${error}`
            );
        }
    }


}
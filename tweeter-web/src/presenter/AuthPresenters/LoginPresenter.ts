// LoginPresenter.tsx
// import { AuthToken, FakeData, User } from "tweeter-shared";
import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";

export interface LoginView {
    displayErrorMessage(message: string): void;
    navigateTo(url: string): void;
    updateUserInfo(user: User, authToken: AuthToken): void;
}

export class LoginPresenter {
    // create a userService: UserService
    // create a view: LoginView
    protected view: LoginView;
    protected userService: UserService = new UserService();
    protected originalUrl: string | undefined;

    constructor(view: LoginView, originalUrl?: string) {
        this.view = view;
        this.originalUrl = originalUrl;
    }



    public async doLogin(alias: string, password: string): Promise<void> {
        try {
            let [user, authToken] = await this.userService.login(alias, password);

            this.view.updateUserInfo(user, authToken);

            if (this.originalUrl) {
                this.view.navigateTo(this.originalUrl);
            } else {
                this.view.navigateTo("/");
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to log user in because of exception: ${error}`
            );
        }
    };



}
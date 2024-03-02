import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { ViewWithNavigate } from "../ViewInterface";

export class LoginPresenter {
    protected view: ViewWithNavigate;
    protected userService: UserService = new UserService();
    protected originalUrl: string | undefined;

    constructor(view: ViewWithNavigate, originalUrl?: string) {
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
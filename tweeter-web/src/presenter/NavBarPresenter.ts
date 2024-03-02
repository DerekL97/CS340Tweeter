import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { ViewWithInfoMessage } from "./ViewInterface";


export interface NavBarView extends ViewWithInfoMessage {
    clearUserInfo: () => void;
}

export class NavBarPresenter {

    protected view: NavBarView;
    protected service: UserService;

    public constructor(view: NavBarView) {
        this.view = view;
        this.service = new UserService();
    }


    public async logOut(authToken: AuthToken | null) {
        this.view.displayInfoMessage("Logging Out...", 0);

        try {
            await this.service.logout(authToken!);

            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to log user out because of exception: ${error}`
            );
        }
    };




}
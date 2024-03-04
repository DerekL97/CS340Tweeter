import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { ViewWithInfoMessage } from "./ViewInterface";
import { Presenter } from "./Presenter";


export interface NavBarView extends ViewWithInfoMessage {
    clearUserInfo: () => void;
}

export class NavBarPresenter extends Presenter<NavBarView> {

    protected service: UserService;

    public constructor(view: NavBarView) {
        super(view);
        this.service = new UserService();
    }

    public async logOut(authToken: AuthToken | null) {
        this._view.displayInfoMessage("Logging Out...", 0);
        await this.wrapFunction(async () => {
            await this.service.logout(authToken!);
            this._view.clearLastInfoMessage();
            this._view.clearUserInfo();
        },
            "log user out")
    };

}
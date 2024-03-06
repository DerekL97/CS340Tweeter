import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { ViewWithInfoMessage } from "./ViewInterface";
import { Presenter } from "./Presenter";


export interface AppNavBarPresenterView extends ViewWithInfoMessage {
    clearUserInfo: () => void;
    navigateToLoginPage: () => void;
}

export class AppNavBarPresenter extends Presenter<AppNavBarPresenterView> {

    protected _service: UserService;

    public constructor(view: AppNavBarPresenterView) {
        super(view);
        this._service = new UserService();
    }

    public get service() {
        return this._service;
    }

    public async logOut(authToken: AuthToken | null) {
        this._view.displayInfoMessage("Logging Out...", 0);
        await this.wrapFunction(async () => {
            await this.service.logout(authToken!);
            this._view.clearLastInfoMessage();
            this._view.clearUserInfo();
            this._view.navigateToLoginPage();
        },
            "log user out")
    };

}
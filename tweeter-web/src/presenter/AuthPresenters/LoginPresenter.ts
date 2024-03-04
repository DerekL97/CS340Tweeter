import { UserService } from "../../model/service/UserService";
import { ViewWithNavigate } from "../ViewInterface";
import { Presenter } from "../Presenter";

export class LoginPresenter extends Presenter<ViewWithNavigate> {
    protected userService: UserService;
    protected originalUrl: string | undefined;

    constructor(view: ViewWithNavigate, originalUrl?: string) {
        super(view);
        this.userService = new UserService();
        this.originalUrl = originalUrl;
    }

    public async doLogin(alias: string, password: string): Promise<void> {
        await this.wrapFunction(async () => {
            let [user, authToken] = await this.userService.login(alias, password);

            this._view.updateUserInfo(user, authToken);

            if (this.originalUrl) {
                this._view.navigateTo(this.originalUrl);
            } else {
                this._view.navigateTo("/");
            }

        },
            "log user in")
    };
}
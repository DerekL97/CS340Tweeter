import { UserService } from "../../model/service/UserService";
import { Presenter } from "../Presenter";
import { ViewWithNavigate } from "../ViewInterface";


export abstract class AuthPresenter extends Presenter<ViewWithNavigate> {
    protected userService: UserService;

    constructor(view: ViewWithNavigate) {
        super(view);
        this.userService = new UserService();
    }
}
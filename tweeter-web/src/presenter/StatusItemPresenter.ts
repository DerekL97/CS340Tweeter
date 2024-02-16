import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";

export interface StatusItemView {
    addItems: (items: Status[]) => void;
    displayErrorMessage: (message: string) => void;
}

export const PAGE_SIZE = 10;


export abstract class StatusItemPresenter {
    protected items: Status[] | null = null;
    protected _hasMoreItems = true;
    protected lastItem: Status | null = null;
    protected _view: StatusItemView;
    protected service: StatusService = new StatusService();

    public constructor(protected view: StatusItemView) {
        this._view = view;
        this.items = null;
        this._hasMoreItems = true;
        this.lastItem = null;
    }

    public abstract loadMoreItems(authToken: AuthToken, displayedUser: User): void;

    public get hasMoreItems() {
        return this._hasMoreItems;
    }


}
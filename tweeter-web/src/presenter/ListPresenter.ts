import { AuthToken, User } from "tweeter-shared";
import { ViewInterface } from "./ViewInterface";

export interface ListView<T> extends ViewInterface {
    addItems: (items: T[]) => void;
}

export const PAGE_SIZE = 10;

export abstract class ListPresenter<T, S> {
    protected _view: ListView<T>;
    protected _hasMoreItems = true;
    protected _lastItem: T | null = null;
    protected _service: S;

    public constructor(view: ListView<T>, service: S) {
        this._view = view;
        this._hasMoreItems = true;
        this._lastItem = null;
        this._service = service;
    }

    public get hasMoreItems() {
        return this._hasMoreItems;
    }

    protected get view() {
        return this._view;
    }

    protected set hasMoreItems(value: boolean) {
        this._hasMoreItems = value;
    }

    public abstract loadMoreItems(authToken: AuthToken, displayedUser: User): void;
}
import { AuthToken, Status, User } from "tweeter-shared";
import { StatusItemPresenter } from "./StatusItemPresenter";

export const PAGE_SIZE = 10;


export class FeedPresenter extends StatusItemPresenter{


    public async loadMoreItems (authToken: AuthToken, displayedUser: User) {
        try {
            if (this.hasMoreItems) {
                let [newItems, hasMore] = await this.service.loadMoreFeed(
                    authToken!,
                    displayedUser!,
                    PAGE_SIZE,
                    this.lastItem
                );

                this._hasMoreItems = hasMore;
                this.lastItem = newItems[newItems.length - 1];
                this._view.addItems(newItems);
            }
        } catch (error) {
            this._view.displayErrorMessage(
                `Failed to load feed items because of exception: ${error}`
            );
        }
    };


}
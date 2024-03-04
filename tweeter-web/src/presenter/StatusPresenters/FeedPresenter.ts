import { AuthToken, Status, User } from "tweeter-shared";
import { ListPresenter, PAGE_SIZE } from "../ListPresenter";
import { StatusService } from "../../model/service/StatusService";


export class FeedPresenter extends ListPresenter<Status, StatusService> {

    public async loadMoreItems(authToken: AuthToken, displayedUser: User) {
        await this.wrapFunction(async () => {
            
            if (this.hasMoreItems) {
                let [newItems, hasMore] = await this._service.loadMoreFeed(
                    authToken!,
                    displayedUser!,
                    PAGE_SIZE,
                    this._lastItem
                );

                this._hasMoreItems = hasMore;
                this._lastItem = newItems[newItems.length - 1];
                this._view.addItems(newItems);
            }

        }, "load feed items")

    };


}
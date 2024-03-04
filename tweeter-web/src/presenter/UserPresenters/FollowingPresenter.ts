import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";
import { ListPresenter, ListView, PAGE_SIZE } from "../ListPresenter";


export class FollowingPresenter extends ListPresenter<User, FollowService> {

  public async loadMoreItems(authToken: AuthToken, user: User) {
    await this.wrapFunction(async () => {
      if (this.hasMoreItems) {

        let [newItems, hasMore] = await this._service.loadMoreFollowees(authToken, user, PAGE_SIZE, this._lastItem);

        this.hasMoreItems = hasMore;
        this._lastItem = newItems[newItems.length - 1];
        this.view.addItems(newItems);
      }

    }, "load followee");
  };

}
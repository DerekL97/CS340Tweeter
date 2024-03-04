import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";
import { ListPresenter, PAGE_SIZE } from "../ListPresenter";


export class FollowersPresenter extends ListPresenter<User, FollowService> {

  public async loadMoreItems(authToken: AuthToken, user: User) {
    await this.wrapFunction(async () => {
      if (this.hasMoreItems) {

        let [newItems, hasMore] = await this._service.loadMoreFollowers(authToken, user, PAGE_SIZE, this._lastItem);

        this.hasMoreItems = hasMore;
        this._lastItem = newItems[newItems.length - 1];
        this.view.addItems(newItems);
      }
    }, "load follower");
  }
}
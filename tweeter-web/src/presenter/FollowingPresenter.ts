import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { UserItemPresenter, UserItemView } from "./UserItemPresenter";

export const PAGE_SIZE = 10;


export class FollowingPresenter extends UserItemPresenter {
    // private view: FollowingView;
    private lastItem: User | null = null;
    private service: FollowService;
  

    public constructor(view: UserItemView) {
        super(view);
        this.service = new FollowService();
    }



    public async loadMoreItems(authToken: AuthToken, user: User) {
        try {
          if (this.hasMoreItems) {

            let [newItems, hasMore] = await this.service.loadMoreFollowees(authToken, user, PAGE_SIZE, this.lastItem);
    
            this.hasMoreItems = hasMore;
            this.lastItem = newItems[newItems.length - 1];
            this.view.addItems(newItems);
          }
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to load followee because of exception: ${error}`
          );
        }
      };
    
}
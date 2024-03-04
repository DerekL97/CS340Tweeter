import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { ViewWithInfoMessage } from "./ViewInterface";
import { Presenter } from "./Presenter";

export interface PostStatusView extends ViewWithInfoMessage {
  setPost: (post: string) => void;
}

export class PostStatusPresenter extends Presenter<PostStatusView>{
  protected service: StatusService;

  public constructor(view: PostStatusView) {
    super(view)
    this.service = new StatusService();
  }

  public async submitPost(post: string, currentUser: User, authToken: AuthToken) {

    await this.wrapFunction(async () => {
      this._view.displayInfoMessage("Posting status...", 0);

      let status = new Status(post, currentUser!, Date.now());

      await this.service.postStatus(authToken!, status);

      this._view.clearLastInfoMessage();
      this._view.setPost("");
      this._view.displayInfoMessage("Status posted!", 2000);
    },
      "post the status")
  };

}
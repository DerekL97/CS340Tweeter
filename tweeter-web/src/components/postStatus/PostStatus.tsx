import "./PostStatus.css";
import { useState } from "react";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoContext from "../userInfo/useUserInfoContext";
import { PostStatusPresenter, PostStatusView } from "../../presenter/PostStatusPresenter";

// define a prop type for the PostStatus component that takes an optional presenter prop
interface Props {
  presenter?: PostStatusPresenter;
}

const PostStatus = (props: Props) => {
  const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
    useToastListener();

  const { currentUser, authToken } = useUserInfoContext();
  const [post, setPost] = useState("");

  const view: PostStatusView = {
    displayInfoMessage: displayInfoMessage,
    clearLastInfoMessage: clearLastInfoMessage,
    setPost: setPost,
    displayErrorMessage: displayErrorMessage,
  };

  const [presenter] = useState(props.presenter ? props.presenter : new PostStatusPresenter(view));

  const submitPost = async (event: React.MouseEvent) => {
    event.preventDefault();
    await presenter.submitPost(post, currentUser!, authToken!);
  };

  const clearPost = (event: React.MouseEvent) => {
    event.preventDefault();
    setPost("");
  };

  const checkButtonStatus: () => boolean = () => {
    return !post.trim() || !authToken || !currentUser;
  };

  return (
    <form>
      <div className="form-group mb-3">
        <textarea
          className="form-control"
          id="postStatusTextArea"
          rows={10}
          placeholder="What's on your mind?"
          aria-label="write status"
          value={post}
          onChange={(event) => {
            setPost(event.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <button
          id="postStatusButton"
          className="btn btn-md btn-primary me-1"
          type="button"
          aria-label="post status"
          disabled={checkButtonStatus()}
          onClick={(event) => submitPost(event)}
        >
          Post Status
        </button>
        <button
          id="clearStatusButton"
          className="btn btn-md btn-secondary"
          type="button"
          aria-label="clear status"
          disabled={checkButtonStatus()}
          onClick={(event) => clearPost(event)}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default PostStatus;

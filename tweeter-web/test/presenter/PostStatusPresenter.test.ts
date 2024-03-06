/*
Write PostStatusPresenter tests similar to the AppNavbarPresenter tests demonstrated in the video. Specifically, your tests should test the following functionality of the postStatus method:

The presenter tells the view to display a posting status message.
The presenter calls postStatus on the post status service with the correct status string and auth token.
When posting of the status is successful, the presenter tells the view to clear the last info message, clear the post, and display a status posted message.
When posting of the status is not successful, the presenter tells the view to display an error message and does not tell it to do the following: clear the last info message, clear the post, and display a status posted message.
*/
import { anything, capture, instance, mock, spy, verify, when } from "ts-mockito";
import { PostStatusPresenter, PostStatusView } from "../../src/presenter/PostStatusPresenter";
import { AuthToken, User, Status } from "tweeter-shared";
import { StatusService } from "../../src/model/service/StatusService";

describe("PostStatusPresenter", () => {
    let mockPostStatusView: PostStatusView;
    let postStatusPresenter: PostStatusPresenter;
    let mockStatusService: StatusService;
    const authToken = new AuthToken("abc123", Date.now());
    const user = new User("testUser", "testUser", "testUser", "testUser");
    const post = "test post";

    beforeEach(() => {
        mockPostStatusView = mock<PostStatusView>();
        const mockPostStatusViewInstance = instance(mockPostStatusView);

        const PostStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusViewInstance));
        postStatusPresenter = instance(PostStatusPresenterSpy);

        mockStatusService = mock<StatusService>();
        const mockStatusServiceInstance = instance(mockStatusService);

        when(PostStatusPresenterSpy.service).thenReturn(mockStatusServiceInstance);
    })

    it("tells the view to display a posting status message", async () => {
        await postStatusPresenter.submitPost(post, user, authToken);
        verify(mockPostStatusView.displayInfoMessage("Posting status...", 0)).once();
    })

    it("calls postStatus on the status service with the correct auth token and status", async () => {
        await postStatusPresenter.submitPost(post, user, authToken);
        // grab the status that was passed to the service
        const [capturedAuthToken, capturedStatus] = capture(mockStatusService.postStatus).first();
        verify(mockStatusService.postStatus(authToken, capturedStatus)).once();
    })

    it("When post successful, tells view to clear the last info message and set post to empty string", async () => {
        await postStatusPresenter.submitPost(post, user, authToken);
        verify(mockPostStatusView.clearLastInfoMessage()).once();
        verify(mockPostStatusView.setPost("")).once();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).once();

        verify(mockPostStatusView.displayErrorMessage(anything())).never();
    })

    it("tells view to display an error message when post fails", async () => {
        const error = new Error("Error posting status");
        when(mockStatusService.postStatus(authToken, anything())).thenThrow(error);

        await postStatusPresenter.submitPost(post, user, authToken);

        verify(mockPostStatusView.displayErrorMessage(anything())).once();

        verify(mockPostStatusView.clearLastInfoMessage()).never();
        verify(mockPostStatusView.setPost(anything())).never();
    })
})
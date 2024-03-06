import { anything, instance, mock, spy, verify, when } from "ts-mockito";
import { AppNavBarPresenter, AppNavBarPresenterView } from "../../src/presenter/AppNavBarPresenter";
import { AuthToken } from "tweeter-shared";
import { UserService } from "../../src/model/service/UserService";


describe("AppNavbarPresenter", () => {
    let mockAppNavbarPresenterView: AppNavBarPresenterView;
    let appNavbarPresenter: AppNavBarPresenter;
    let mockUserService: UserService;

    const authToken = new AuthToken("abc123", Date.now());
    beforeEach(() => {
        mockAppNavbarPresenterView = mock<AppNavBarPresenterView>();
        const mockAppNavbarPresenterViewInstance = instance(mockAppNavbarPresenterView);

        const AppNavbarPresenterSpy = spy(new AppNavBarPresenter(mockAppNavbarPresenterViewInstance));
        appNavbarPresenter = instance(AppNavbarPresenterSpy);

        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(AppNavbarPresenterSpy.service).thenReturn(mockUserServiceInstance);
    })
    it("tells the view to display a logging out message", async () => {
        await appNavbarPresenter.logOut(null);
        verify(mockAppNavbarPresenterView.displayInfoMessage("Logging Out...", 0)).once();

    })

    it("calls logout on the user service with the correct auth token", async () => {
        await appNavbarPresenter.logOut(authToken);
        verify(mockUserService.logout(authToken)).once();
    })
    
    it("When logout successful, tells view to clear the last info message, user info, and navigate to the login page", async () => {
        await appNavbarPresenter.logOut(authToken);
        verify(mockAppNavbarPresenterView.clearLastInfoMessage()).once();
        verify(mockAppNavbarPresenterView.clearUserInfo()).once();
        verify(mockAppNavbarPresenterView.navigateToLoginPage()).once();

        verify(mockAppNavbarPresenterView.displayErrorMessage(anything())).never();

    })

    it("When logout fails, tells view to display an error message", async () => {
        const error = new Error("Error logging out");
        when(mockUserService.logout(authToken)).thenThrow(error);

        await appNavbarPresenter.logOut(authToken);

        verify(mockAppNavbarPresenterView.displayErrorMessage("Failed to log user out because of exception: Error logging out")).once();

        verify(mockAppNavbarPresenterView.clearLastInfoMessage()).never();
        verify(mockAppNavbarPresenterView.clearUserInfo()).never();
        verify(mockAppNavbarPresenterView.navigateToLoginPage()).never();

    })

})
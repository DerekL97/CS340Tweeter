import { AuthToken, FakeData, User } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { FollowService } from "../../model/service/FollowService";


export interface UserInfoView {
    displayErrorMessage: (message: string) => void;
    setDisplayedUser: (user: User) => void;
    setIsFollower: (isFollower: boolean) => void;
}

export class UserInfoPresenter {
    private view: UserInfoView;
    private service: FollowService;

    public constructor(view: UserInfoView) {
        this.view = view;
        this.service = new FollowService();
    }

    public async getFolloweesCount(
        authToken: AuthToken,
        user: User
    ) {
        return await this.service.getFolloweesCount(authToken, user);
    }

    public async getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        return this.service.getFollowersCount(authToken, user);
    };



    public async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        // Pause so we can see the following message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        let followersCount = await this.service.getFollowersCount(authToken, userToFollow);
        let followeesCount = await this.service.getFolloweesCount(authToken, userToFollow);

        return [followersCount, followeesCount];
    };
    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        // Pause so we can see the unfollowing message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        let followersCount = await this.service.getFollowersCount(authToken, userToUnfollow);
        let followeesCount = await this.service.getFolloweesCount(authToken, userToUnfollow);

        return [followersCount, followeesCount];
    };



    public async followUser(authToken: AuthToken, user: User): Promise<void> {
        try {
            await this.followUser(authToken, user);
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to follow user because of exception: ${error}`
            );
        }
    }

    public async unfollowUser(authToken: AuthToken, user: User): Promise<void> {
        try {
            await this.unfollowUser(authToken, user);
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to unfollow user because of exception: ${error}`
            );
        }
    }

    public async setIsFollowerStatus(
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ) {
        try {
            if (currentUser === displayedUser) {
                this.view.setIsFollower(false);
            } else {
                this.view.setIsFollower(
                    await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
                );
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to determine follower status because of exception: ${error}`
            );
        }
    };


}
import { AuthToken, FakeData, User } from "tweeter-shared";
import { UserService } from "../../model/service/UserService";
import { FollowService } from "../../model/service/FollowService";
import { Presenter } from "../Presenter";


export interface UserInfoView {
    displayErrorMessage: (message: string) => void;
    setDisplayedUser: (user: User) => void;
    setIsFollower: (isFollower: boolean) => void;
}

export class UserInfoPresenter extends Presenter<UserInfoView> {
    private service: FollowService;

    public constructor(view: UserInfoView) {
        super(view);
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
        await this.wrapFunction(async () => { await this.followUser(authToken, user) }, "follow user"); // todo: figure out recursive nonsense
    }

    public async unfollowUser(authToken: AuthToken, user: User): Promise<void> {
        await this.wrapFunction(async () => { await this.unfollowUser(authToken, user) }, "unfollow user"); // todo: figure out recursive nonsense
    }

    public async setIsFollowerStatus(
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ) {
        await this.wrapFunction(async () => {
            if (currentUser === displayedUser) {
                this._view.setIsFollower(false);
            } else {
                this._view.setIsFollower(
                    await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
                );
            }

        }, "determine follower status");
    };
}
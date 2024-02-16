import { AuthToken, FakeData, Status, User } from "tweeter-shared";

export class StatusService {

    public async loadMoreFeed(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        return await FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    }
    public async loadMoreStory(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        return await FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    }
}
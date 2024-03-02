import { AuthToken, User } from "tweeter-shared";

export interface ViewInterface {
    displayErrorMessage: (message: string) => void;
}

export interface ViewWithInfoMessage extends ViewInterface {
    displayInfoMessage: (message: string, duration: number) => void;
    clearLastInfoMessage: () => void;
}

export interface ViewWithNavigate extends ViewInterface {
    navigateTo(url: string): void;
    updateUserInfo(user: User, authToken: AuthToken): void;
}
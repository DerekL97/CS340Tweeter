import { ViewInterface } from "./ViewInterface";

export abstract class Presenter<T extends ViewInterface> {
    protected _view: T;

    public constructor(view: T) {
        this._view = view;
    }

    protected async wrapFunction(func: (...args: any[]) => void, message: string) {
        try {
            await func();
        } catch (error) {
            this._view.displayErrorMessage(
                `Failed to ${message} because of exception: ${(error as Error).message}`
            );
        }
    }

}
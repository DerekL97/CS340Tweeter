/*
Write PostStatus component tests similar to the Login component tests demonstrated in the video. Specifically, your tests should test the following functionality of the PostStatus component:

When first rendered the Post Status and Clear buttons are both disabled.
Both buttons are enabled when the text field has text.
Both buttons are disabled when the text field is cleared.
The presenter's postStatus method is called with correct parameters when the Post Status button is pressed.
*/

import { MemoryRouter } from "react-router-dom";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"
import { PostStatusPresenter } from "../../../src/presenter/PostStatusPresenter";
import { anything, instance, mock, verify } from "ts-mockito";
import { AuthToken, User } from "tweeter-shared";
import useUserInfoContext from '../../../src/components/userInfo/useUserInfoContext';

jest.mock('../../../src/components/userInfo/useUserInfoContext', () => {
    return jest.fn().mockReturnValue({
        currentUser: 'testUser',
        authToken: 'testToken',
    });
});


describe("PostStatus Component", () => {
    it("start with the Post Status and Clear buttons disabled", () => {
        const { postStatusButton, clearStatusButton } = renderPostStatusAndGetElements();

        expect(postStatusButton).toBeDisabled();
        expect(clearStatusButton).toBeDisabled();
    });

    it("enables the Post Status and Clear buttons when the text field has text", async () => {
        const { postStatusButton, clearStatusButton, textField, user } = renderPostStatusAndGetElements();

        await user.type(textField, "longer test");

        expect(postStatusButton).toBeEnabled();
        expect(clearStatusButton).toBeEnabled();
    });

    it("disables the Post Status and Clear buttons when the text field is cleared", async () => {
        const { postStatusButton, clearStatusButton, textField, user } = renderPostStatusAndGetElements();

        await user.type(textField, "test");
        expect(postStatusButton).toBeEnabled();
        expect(clearStatusButton).toBeEnabled();
        await user.clear(textField);

        expect(postStatusButton).toBeDisabled();
        expect(clearStatusButton).toBeDisabled();
    });

    it("calls the presenter's submitPost method when the Post Status button is clicked", async () => {
        const mockPresenter = mock<PostStatusPresenter>();
        const mockPresenterInstance = instance(mockPresenter);
        const { postStatusButton, textField, user } = renderPostStatusAndGetElements(mockPresenterInstance);
        const post = "test";
        await user.type(textField, post);

        expect(postStatusButton).toBeEnabled();

        await user.click(postStatusButton);

        verify(mockPresenter.submitPost(anything(), anything(), anything())).once();
    });
});

const renderPostStatus = (presenter?: PostStatusPresenter) => {
    return render(
        <MemoryRouter>
            {!!presenter ? <PostStatus presenter={presenter} /> : <PostStatus />}
        </MemoryRouter>
    );
}

const renderPostStatusAndGetElements = (presenter?: PostStatusPresenter) => {
    const user = userEvent.setup();

    renderPostStatus(presenter);

    const postStatusButton = screen.getByLabelText(/post status/i);
    const clearStatusButton = screen.getByLabelText(/clear status/i);
    const textField = screen.getByLabelText(/write status/i);

    return { postStatusButton, clearStatusButton, textField, user };
}
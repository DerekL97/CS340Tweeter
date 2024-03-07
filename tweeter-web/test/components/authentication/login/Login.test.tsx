import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login";
import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { LoginPresenter } from "../../../../src/presenter/AuthPresenters/LoginPresenter";
import { instance, mock, verify } from "ts-mockito";
library.add(fab);



describe("Login Component", () => {

    it("start with the sign-in button disabled", () => {
        const { signInButton } = renderLoginAndGetElements("/");

        expect(signInButton).toBeDisabled();
    })
    it("enables the sign-in button when the alias and password are entered", async () => {
        const { signInButton, aliasInput, passwordInput, user } = renderLoginAndGetElements("/");

        await user.type(aliasInput, "test");
        await user.type(passwordInput, "test");

        expect(signInButton).toBeEnabled();
    })
    it("disables the sign-in button when either the alias or password are cleared", async () => {
        const { signInButton, aliasInput, passwordInput, user } = renderLoginAndGetElements("/");

        await user.type(aliasInput, "test");
        await user.type(passwordInput, "test");

        expect(signInButton).toBeEnabled();
        await user.clear(aliasInput);
        expect(signInButton).toBeDisabled();

        await user.type(aliasInput, "test");
        expect(signInButton).toBeEnabled();
        await user.clear(passwordInput);
        expect(signInButton).toBeDisabled();

    })

    it("calls the presenter's doLogin method when the sign-in button is clicked", async () => {
        const mockPresenter = mock<LoginPresenter>();
        const mockPresenterInstance = instance(mockPresenter);
        const { signInButton, aliasInput, passwordInput, user } = renderLoginAndGetElements("/", mockPresenterInstance);
        const alias = "test";
        const password = "test";
        await user.type(aliasInput, alias);
        await user.type(passwordInput, password);

        await user.click(signInButton);

        verify(mockPresenter.doLogin(alias, password)).once();
    })

})

const renderLogin = (originalUrl: string, presenter?: LoginPresenter) => {
    return render(
        <MemoryRouter>
            {!!presenter ? <Login presenter={presenter} originalUrl={originalUrl} /> : <Login originalUrl={originalUrl} />}
        </MemoryRouter>);
}
const renderLoginAndGetElements = (originalUrl: string, presenter?: LoginPresenter) => {
    const user = userEvent.setup();

    renderLogin(originalUrl, presenter);

    const signInButton = screen.getByRole("button", { name: /Sign in/i });
    const aliasInput = screen.getByLabelText(/alias/i);
    const passwordInput = screen.getByLabelText(/password/i);

    return { signInButton, aliasInput, passwordInput, user };
}

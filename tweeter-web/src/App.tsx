import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import StatusItemScroller from "./components/mainLayout/StatusItemScroller";
import UserItemScroller from "./components/mainLayout/UserItemScroller";
import useUserInfoContext from "./components/userInfo/useUserInfoContext";
import { UserItemView } from "./presenter/UserPresenters/UserItemPresenter";
import { FollowingPresenter } from "./presenter/UserPresenters/FollowingPresenter";
import { FollowersPresenter } from "./presenter/UserPresenters/FollowersPresenter";
import { StatusItemView } from "./presenter/StatusPresenters/StatusItemPresenter";
import { FeedPresenter } from "./presenter/StatusPresenters/FeedPresenter";
import { StoryPresenter } from "./presenter/StatusPresenters/StoryPresenter";
import { LoginPresenter, LoginView } from "./presenter/AuthPresenters/LoginPresenter";

const App = () => {
  const { currentUser, authToken } = useUserInfoContext();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route
          path="feed"
          element={
            <StatusItemScroller
              presenterGenerator={(view: StatusItemView) => new FeedPresenter(view)}
            />
          }
        />
        <Route
          path="story"
          element={
            <StatusItemScroller
              presenterGenerator={(view: StatusItemView) => new StoryPresenter(view)}
            />
          }
        />
        <Route
          path="following"
          element={
            <UserItemScroller
              presenterGenerator={(view: UserItemView) => new FollowingPresenter(view)}
            />
          }
        />
        <Route
          path="followers"
          element={
            <UserItemScroller
              presenterGenerator={(view: UserItemView) => new FollowersPresenter(view)}
            />
          }
        />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login
        generatePresenter={(view: LoginView) => new LoginPresenter(view)}
      />} />

      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login
        generatePresenter={(view: LoginView) => new LoginPresenter(view, location.pathname)}
      />} />
    </Routes>
  );
};

export default App;

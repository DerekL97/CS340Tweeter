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
import { FollowingPresenter } from "./presenter/UserPresenters/FollowingPresenter";
import { FollowersPresenter } from "./presenter/UserPresenters/FollowersPresenter";
import { FeedPresenter } from "./presenter/StatusPresenters/FeedPresenter";
import { StoryPresenter } from "./presenter/StatusPresenters/StoryPresenter";
import { LoginPresenter } from "./presenter/AuthPresenters/LoginPresenter";
import { RegisterPresenter } from "./presenter/AuthPresenters/RegisterPresenter";
import { StatusService } from "./model/service/StatusService";
import { FollowService } from "./model/service/FollowService";
import { ListView } from "./presenter/ListPresenter";
import { Status, User } from "tweeter-shared";

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
              presenterGenerator={(view: ListView<Status>) => new FeedPresenter(view, new StatusService())}
            />
          }
        />
        <Route
          path="story"
          element={
            <StatusItemScroller
              presenterGenerator={(view: ListView<Status>) => new StoryPresenter(view, new StatusService())}
            />
          }
        />
        <Route
          path="following"
          element={
            <UserItemScroller
              presenterGenerator={(view: ListView<User>) => new FollowingPresenter(view, new FollowService())}
            />
          }
        />
        <Route
          path="followers"
          element={
            <UserItemScroller
              presenterGenerator={(view: ListView<User>) => new FollowersPresenter(view, new FollowService())}
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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default App;

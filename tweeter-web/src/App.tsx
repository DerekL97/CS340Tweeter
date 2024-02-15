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
import { AuthToken, User, FakeData, Status } from "tweeter-shared";
import UserItemScroller from "./components/mainLayout/UserItemScroller";
import useUserInfoContext from "./components/userInfo/useUserInfoContext";
import { UserItemView } from "./presenter/UserItemPresenter";
import { FollowingPresenter } from "./presenter/FollowingPresenter";
import { FollowersPresenter } from "./presenter/FollowersPresenter";

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
              itemDescription="feed"
              loadMoreStatusItems={async (authToken: AuthToken, user: User, pageSize: number, lastItem: Status | null) => {
                return await FakeData.instance.getPageOfStatuses(lastItem, pageSize);
              }}
            />
          }
        />
        <Route
          path="story"
          element={
            <StatusItemScroller
              itemDescription="story"
              loadMoreStatusItems={async (authToken: AuthToken, user: User, pageSize: number, lastItem: Status | null) => {
                return await FakeData.instance.getPageOfStatuses(lastItem, pageSize);
              }}
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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;

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
  const loadMoreFollowers = async (
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
  };

  const loadMoreFollowees = async (
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
  };

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
              loadItems={loadMoreFollowees}
              itemDescription="followees"
            />
          }
        />
        <Route
          path="followers"
          element={
            <UserItemScroller
              loadItems={loadMoreFollowers}
              itemDescription="followers"
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

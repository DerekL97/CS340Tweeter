import { User } from "tweeter-shared";
import { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UserItem from "../userItem/UserItem";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoContext from "../userInfo/useUserInfoContext";
import { ListPresenter, ListView } from "../../presenter/ListPresenter";
import { FollowersPresenter } from "../../presenter/UserPresenters/FollowersPresenter";
import ItemScroller from "./Scroller";
import { FollowService } from "../../model/service/FollowService";

// export const PAGE_SIZE = 10;

interface Props {
  presenterGenerator: (view: ListView<User>) => ListPresenter<User, FollowService>;
}

const UserItemScroller = (props: Props) => {
  return (
    <ItemScroller
      presenterGenerator={props.presenterGenerator}
      renderItem={(item, index) => (
        <div
          key={index}
          className="row mb-3 mx-0 px-0 border rounded bg-white"
        >
          <div className="col">
            <UserItem value={item} />
          </div>
        </div>
      )}
    />
  );};

export default UserItemScroller;

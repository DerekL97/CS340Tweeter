import { Status } from "tweeter-shared";
import { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import StatusItem from "../statusItem/StatusItem";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoContext from "../userInfo/useUserInfoContext";
import { StatusItemPresenter, StatusItemView } from "../../presenter/StatusItemPresenter";


interface Props {
  presenterGenerator: (view: StatusItemView) => StatusItemPresenter;
}

const StatusItemScroller = (props: Props) => {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<Status[]>([]);

  // Required to allow the addItems method to see the current value of 'items'
  // instead of the value from when the closure was created.
  const itemsReference = useRef(items);
  itemsReference.current = items;

  const listener: StatusItemView = {
    addItems: (newItems: Status[]) =>
      setItems([...itemsReference.current, ...newItems]),
    displayErrorMessage: (message: string) => {
      displayErrorMessage(message);
    }
  }


  const [presenter] = useState(props.presenterGenerator(listener));

  const { displayedUser, authToken } = useUserInfoContext();

  const loadMoreItems = async () => {
    presenter.loadMoreItems(authToken!, displayedUser!);
  };

  // Load initial items
  useEffect(() => {
    loadMoreItems();
  },
    []);



  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={presenter.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="row mb-3 mx-0 px-0 border rounded bg-white"
          >
            <div className="col">
              <StatusItem value={item} />
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );

}

export default StatusItemScroller;
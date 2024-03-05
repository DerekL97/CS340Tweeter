import { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoContext from "../userInfo/useUserInfoContext";
import { ListPresenter, ListView } from "../../presenter/ListPresenter";

interface Props<T, P> {
  presenterGenerator: (view: ListView<T>) => ListPresenter<T, P>;
  renderItem: (item: T, index: number) => JSX.Element;
}

const ItemScroller = <T, P>({ presenterGenerator, renderItem }: Props<T, P>) => {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<T[]>([]);

  const itemsReference = useRef(items);
  itemsReference.current = items;

  const listener: ListView<T> = {
    addItems: (newItems: T[]) =>
      setItems([...itemsReference.current, ...newItems]),
    displayErrorMessage: (message: string) => {
      displayErrorMessage(message);
    }
  }

  const [presenter] = useState(presenterGenerator(listener));

  const { displayedUser, authToken } = useUserInfoContext();

  const loadMoreItems = async () => {
    presenter.loadMoreItems(authToken!, displayedUser!);
  };

  useEffect(() => {
    loadMoreItems();
  }, []);

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={presenter.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map(renderItem)}
      </InfiniteScroll>
    </div>
  );
};

export default ItemScroller;
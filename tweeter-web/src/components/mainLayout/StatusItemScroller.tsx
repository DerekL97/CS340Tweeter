import { Status } from "tweeter-shared";
import StatusItem from "../statusItem/StatusItem";
import { ListPresenter, ListView } from "../../presenter/ListPresenter";
import { StatusService } from "../../model/service/StatusService";
import ItemScroller from "./Scroller";


interface Props {
  presenterGenerator: (view: ListView<Status>) => ListPresenter<Status, StatusService>;
}

const StatusItemScroller = (props: Props) => {
  return (
    <ItemScroller
      presenterGenerator={props.presenterGenerator}
      renderItem={(item, index) => (
        <div
          key={index}
          className="row mb-3 mx-0 px-0 border rounded bg-white"
        >
          <div className="col">
            <StatusItem value={item} />
          </div>
        </div>
      )}
    />
  );
}

export default StatusItemScroller;
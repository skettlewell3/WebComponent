import RecordTable from "./recordTable/RecordTable";
import StopWatch from "./watch/StopWatch";

export default function MainContainer() {
    return (
        <div className="mainContainer">
            <div className="watchContainer">
                <StopWatch />
            </div>
            <div className="tableContainer">
                <RecordTable />
            </div>
        </div>
    )
}

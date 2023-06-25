/* eslint-disable react/prop-types */
const Footer = ({
  filterStatus,
  setFilterStatus,
  handleClearCompleted,
  numberNotCompleted,
}) => {
  return (
    <footer className="todos__footer">
      <p>{numberNotCompleted} items left</p>
      <div className="filters">
        <button
          onClick={() => setFilterStatus("all")}
          className={filterStatus === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus("active")}
          className={filterStatus === "active" ? "active" : ""}
        >
          Active
        </button>
        <button
          onClick={() => setFilterStatus("completed")}
          className={filterStatus === "completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>
      <button onClick={handleClearCompleted}>Clear completed</button>
    </footer>
  );
};
export default Footer;

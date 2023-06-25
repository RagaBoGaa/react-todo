/* eslint-disable react/prop-types */
const Form = ({ handleSubmit, inputTodo, setInputTodo }) => {
  return (
    <div className="input__container">
      <div className="circle"></div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Create a new todo..."
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
      </form>
    </div>
  );
};
export default Form;

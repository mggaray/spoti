const Form = ({ handleChange, handleSubmit }: any) => {
  return (
    <form action="">
      <input
        type="text"
        name="search"
        placeholder="Search for an artist"
        onChange={handleChange}
      />
      <button type={"submit"} name="send" onClick={handleSubmit}>
        search
      </button>
    </form>
  );
};

export default Form;

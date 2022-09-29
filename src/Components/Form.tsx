const Form = ({ handleChange, handleSubmit }: any) => {
  return (
    <form action=''>
      <input type='text' name='buscador' placeholder='Busca un artista!!' onChange={handleChange} />
      <button type={"submit"} name='enviar' onClick={handleSubmit}>
        buscar
      </button>
    </form>
  );
};

export default Form;

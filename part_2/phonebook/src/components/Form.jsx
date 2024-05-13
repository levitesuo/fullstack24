import Input from "./Input";

const Form = ({onSubmit, onNameChange, nameValue, onNumberChange, numberValue}) => {
    return (
      <form onSubmit={onSubmit}>
          <Input onChange={onNameChange} value={nameValue} text="name" />
          <Input onChange={onNumberChange} value={numberValue} text="number" />
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

export default Form
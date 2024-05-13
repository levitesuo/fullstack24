const Input = ({onChange, value, text}) => (
    <div>
      {text}: <input 
        value={value}
        onChange={onChange}
      />
    </div>
  )

export default Input
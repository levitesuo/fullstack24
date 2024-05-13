const Contact = ({contact, removeCommand}) => (
  <div>
    {contact.name} {contact.number}
    <button onClick={() => removeCommand(contact)}>Delete</button>
  </div>
)

const ContactList = ({contancts, removeCommand}) => (
  <div>
    {
      contancts.map((contact, i) =>
        <Contact contact={contact} removeCommand={removeCommand} key={i}/>
      )
    }
  </div>
)

export default ContactList
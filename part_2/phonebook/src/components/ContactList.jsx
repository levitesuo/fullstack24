const Contact = ({contact}) => <p>{contact.name} {contact.number}</p>

const ContactList = ({contancts}) => (
  <div>
    {
      contancts.map((contact, i) =>
        <Contact contact={contact} key={i}/>
      )
    }
  </div>
)

export default ContactList
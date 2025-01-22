const Notification = ({ message , color }) => {
  if ( message === null ) {
    return null
  }
  if ( color === 'green' ) {
    return (
      <div className='notification'>
        {message}
      </div>
    )
  }
  if ( color === 'red' ) {
    return (
      <div className='error'>
        {message}
      </div>
    )

  }
}

export default Notification
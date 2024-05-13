const Header = ({text}) => {
    return (
      <h1>{text}</h1>
    )
  }
  
  const Part = ({part}) => {
    return(
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Parts = ({parts}) => {
    return(
      <div>
        {
          parts.map((part, i) =>
            <Part part={part} key={i} />
          )
        }
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const sum = parts.reduce((acc, curr) => acc + curr.exercises, 0)
    return(
      <b>Number of exercises {sum}</b>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header text={course.name} />
        <Parts parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course
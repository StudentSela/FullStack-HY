const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
      </div>
    );
  }
  const Header = (props) => {
    return <h1>{props.name}</h1>;
  }
  
  const Content = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
      <>
        <div>
        {parts.map(part => (
          <div key={part.id}>
            {part.name} {part.exercises}
          </div>
        ))}
      </div>
      <p>total of {total} exercises </p>
      </>
    );
  }
  export default Course;
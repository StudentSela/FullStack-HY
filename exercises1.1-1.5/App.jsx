const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  const Header = ({ courseName }) => <h1>{courseName}</h1>;

  const Content = ({ parts }) => (
    <div>
      <Part partName={parts[0].name} exercises={parts[0].exercises} />
      <Part partName={parts[1].name} exercises={parts[1].exercises} />
      <Part partName={parts[2].name} exercises={parts[2].exercises} />
    </div>
  );

  const Total = ({ parts }) => (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  );

  const Part = ({ partName, exercises }) => <p>{partName} {exercises}</p>;

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
export default App;
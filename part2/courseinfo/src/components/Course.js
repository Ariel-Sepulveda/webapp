const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <p><b>total of {course.parts.reduce((pV, cV) => pV + cV.exercises, 0)} exercises</b></p>
        </>
    )
}

const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises} />)}
        </>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name + ' ' + exercises}
        </p>
    )
}

export default Course
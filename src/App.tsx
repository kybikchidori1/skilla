import "./App.scss";
import Courses from "./components/Courses";
import { courses } from "./lib/data";

function App() {
    return (
        <div className="App">
            <header className="App-header">Тестовое UniPage</header>
            <Courses coursesData={courses} />
        </div>
    );
}

export default App;

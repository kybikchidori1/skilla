import { useState } from "react";
import "./App.css";
import Courses from "./component";
import { courses } from "./data";

function App() {
    const [userValues, setUserValues] = useState([null, null]);

    return (
        <div className="App">
            <header className="App-header">
                <p>Тестовое UniPage</p>
            </header>
            <Courses coursesData={courses} />
        </div>
    );
}

export default App;

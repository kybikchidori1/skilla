import { useEffect } from "react";
import { useState } from "react";
import "./index.css";

interface CourseItem {
    name: string;
    prices: (number | null)[];
}

interface CoursesProps {
    coursesData: CourseItem[];
}

const getRange = (values: any) => {
    const firstValue = values[0];
    const secondValue = values[1];

    if (firstValue && secondValue) {
        return `от ${firstValue} до ${secondValue} рублей`;
    }
    if (firstValue) {
        return `от ${firstValue} рублей`;
    }
    if (secondValue) {
        return `до ${secondValue} рублей`;
    }

    return "Нет курсов";
};

const Course = ({ courseData }: any): JSX.Element => {
    return (
        <div className="course-item">
            <div className="course-item__title">{courseData.name}</div>
            <div className="course-item__price">
                {getRange(courseData.prices)}
            </div>
        </div>
    );
};

const Courses = ({ coursesData }: CoursesProps): JSX.Element => {
    const [data, setData] = useState(coursesData);
    const [userValue, setUserValue] = useState<(null | number)[]>([null, null]);

    const setValue = (event: any) => {
        const value = event.target.value;
        const name = event.target.name;

        setUserValue((preState) => {
            if (name === "value_1") {
                return [value, preState[1]];
            }
            return [preState[0], value];
        });
    };

    useEffect(() => {
        // if (!userValue[0] && !userValue[1]) return;

        let currentData = coursesData;
        console.log("currentData", currentData);

        const value_1 = userValue[0];
        const value_2 = userValue[1];

        if (value_1) {
            currentData = currentData.filter((item: any) => {
                if (item.prices[1] && value_1 > item.prices[1]) {
                    console.log("HERE");
                    return false;
                }
                if (!item.prices[0]) return true;

                return item.prices[0] >= value_1;
            });
        }

        if (value_2) {
            currentData = currentData.filter((item: any) => {
                return item.prices[0] <= value_2;
            });
        }

        setData(currentData);

        console.log("currentData", currentData);
    }, [userValue]);

    return (
        <div>
            <div className="course__title">Выберите диапозон</div>
            <div className="course__range">
                От{" "}
                <input
                    name="value_1"
                    type="number"
                    value={userValue[0] ?? ""}
                    onChange={setValue}
                />
                до
                <input
                    name="value_2"
                    type="number"
                    value={userValue[1] ?? ""}
                    onChange={setValue}
                />
            </div>

            {data.map((courseItem) => (
                <Course courseData={courseItem} />
            ))}
        </div>
    );
};

export default Courses;

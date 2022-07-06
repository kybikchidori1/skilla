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
    const [defaultData, setDefaultData] = useState<any>(coursesData);
    const [filteredData, setFilteredData] = useState<any>(null);
    const [userValueFrom, setUserValueFrom] = useState<null | number>(null);
    const [userValueTo, setUserValueTo] = useState<null | number>(1000);

    const setValue = (event: any) => {
        const value = event.target.value;
        const name = event.target.name;

        if (name === "from") {
            setUserValueFrom(value);
        } else {
            setUserValueTo(value);
        }
    };

    useEffect(() => {
        if (!userValueFrom && !userValueTo) return setFilteredData(defaultData); // Проверка на пустоту

        if (userValueFrom && userValueFrom <= 0) {
            setUserValueFrom(null);
        }
        if (userValueTo && userValueTo <= 0) {
            setUserValueTo(null);
        }

        let currentData = defaultData;

        if (userValueFrom) {
            currentData = currentData.filter((item: any) => {
                if (item.prices[1] && userValueFrom > item.prices[1])
                    return false;

                if (!item.prices[0]) return true;

                return item.prices[0] >= userValueFrom;
            });
        }

        if (userValueTo) {
            currentData = currentData.filter((item: any) => {
                if (userValueTo < item.prices[0]) return false;
                return item.prices[1] <= userValueTo;
            });
        }

        setFilteredData(currentData);

        console.log("currentData", currentData);
    }, [defaultData, userValueFrom, userValueTo]);

    const dataSort = (type: "Up" | "Down") => {
        const newDAta = [...defaultData].sort((a: any, b: any) => {
            const value_1 = a.prices[1]
                ? a.prices[1]
                : a.prices[0]
                ? a.prices[0]
                : 0;

            const value_2 = b.prices[1]
                ? b.prices[1]
                : b.prices[0]
                ? b.prices[0]
                : 0;

            if (type === "Up") {
                return value_2 - value_1;
            } else {
                return value_1 - value_2;
            }
        });

        setDefaultData(newDAta);
    };

    return filteredData ? (
        <div>
            <div className="course__title">Выберите диапозон</div>
            <div className="course__range">
                От{" "}
                <input
                    name="from"
                    type="number"
                    value={userValueFrom ?? "0"}
                    onChange={setValue}
                />
                до
                <input
                    name="to"
                    type="number"
                    value={userValueTo ?? "0"}
                    onChange={setValue}
                />
            </div>
            <div className="course__title">Отсортировать по цене</div>
            <button onClick={() => dataSort("Up")}>Дорогие сверху</button>
            <button onClick={() => dataSort("Down")}>Дешевые сверху</button>
            {filteredData.map((courseItem: any) => (
                <Course courseData={courseItem} />
            ))}
        </div>
    ) : (
        <div>Загрузка</div>
    );
};

export default Courses;

import { useEffect, useState } from "react";
import { CourseItem, SortType } from "../../lib/interfaces";
import Course from "../CourseItem";
import "./index.scss";

interface CoursesProps {
    coursesData: CourseItem[];
}

const Courses = ({ coursesData }: CoursesProps): JSX.Element => {
    const [defaultData, setDefaultData] = useState<CourseItem[]>(coursesData);
    const [filteredData, setFilteredData] = useState<CourseItem[] | null>(null);
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
            currentData = currentData.filter((item: CourseItem) => {
                if (!item.prices[0] && !item.prices[1]) return false;

                if (item.prices[1] && userValueFrom > item.prices[1])
                    return false;

                if (!item.prices[0]) return true;

                return item.prices[0] >= userValueFrom;
            });
        }

        if (userValueTo) {
            currentData = currentData.filter((item: CourseItem) => {
                if (!item.prices[0] && !item.prices[1]) return true;
                if (item.prices[0]) {
                    return !(userValueTo < item.prices[0]);
                }
                if (item.prices[1]) {
                    return item.prices[1] <= userValueTo;
                }
                return false;
            });
        }

        setFilteredData(currentData);
    }, [defaultData, userValueFrom, userValueTo]);

    const dataSort = (type: SortType) => {
        // Здесь в начаде мы копируем масив что бы не мутировать уже имеющиеся данные.
        const newDAta = [...defaultData].sort(
            (a: CourseItem, b: CourseItem) => {
                const value_1 = a.prices[1] || a.prices[0] || 0;
                const value_2 = b.prices[1] || b.prices[0] || 0;

                if (type === "Up") {
                    return value_2 - value_1;
                } else {
                    return value_1 - value_2;
                }
            }
        );

        setDefaultData(newDAta);
    };

    // Варианты цен из задания
    const requiredRange1 = () => {
        setUserValueFrom(null);
        setUserValueTo(200);
    };
    const requiredRange2 = () => {
        setUserValueFrom(100);
        setUserValueTo(350);
    };
    const requiredRange3 = () => {
        setUserValueFrom(200);
        setUserValueTo(null);
    };
    const requiredRangeClear = () => {
        setUserValueFrom(null);
        setUserValueTo(null);
    };

    return filteredData ? (
        <div className="courses">
            <div className="courses__left-content">
                <div className="courses__title">Выберите диапозон</div>
                <div className="courses__range-btns-box">
                    <button
                        onClick={requiredRange1}
                        className="courses__range-btn"
                    >
                        requiredRange1
                    </button>
                    <button
                        onClick={requiredRange2}
                        className="courses__range-btn"
                    >
                        requiredRange2
                    </button>
                    <button
                        onClick={requiredRange3}
                        className="courses__range-btn"
                    >
                        requiredRange3
                    </button>
                    <button
                        onClick={requiredRangeClear}
                        className="courses__range-btn icon"
                    >
                        <svg
                            width="34"
                            height="34"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                opacity="0.3"
                                d="M6.22223 6.94116H11.5556V13.6078H6.22223V6.94116Z"
                                fill="#ffffff"
                            />
                            <path
                                d="M11.2222 3.60783L10.5556 2.94116H7.22223L6.55556 3.60783H4.22223V4.94116H13.5556V3.60783H11.2222ZM4.8889 13.6078C4.8889 14.3412 5.4889 14.9412 6.22223 14.9412H11.5556C12.2889 14.9412 12.8889 14.3412 12.8889 13.6078V5.60783H4.8889V13.6078ZM6.22223 6.94116H11.5556V13.6078H6.22223V6.94116Z"
                                fill="#ffffff"
                            />
                        </svg>
                    </button>
                </div>

                <div className="courses__range">
                    <div className="courses__title">Настраиваемый вариант</div>
                    От{" "}
                    <input
                        name="from"
                        type="number"
                        value={userValueFrom ?? "0"}
                        onChange={setValue}
                        className="courses__input"
                    />
                    до
                    <input
                        name="to"
                        type="number"
                        value={userValueTo ?? "0"}
                        onChange={setValue}
                        className="courses__input"
                    />
                </div>
                <div className="courses__title">Отсортировать по цене</div>
                <button
                    onClick={() => dataSort("Up")}
                    className="courses__sort-btn"
                >
                    Дорогие сверху
                </button>
                <button
                    onClick={() => dataSort("Down")}
                    className="courses__sort-btn"
                >
                    Дешевые сверху
                </button>
            </div>
            <div className="courses__border-between"></div>
            <div className="courses__right-content">
                {filteredData.map((courseItem: any) => (
                    <Course courseData={courseItem} />
                ))}
            </div>
        </div>
    ) : (
        <div>Загрузка</div>
    );
};

export default Courses;

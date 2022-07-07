import { CourseItem, PriceItem } from "../../lib/interfaces";
import "./index.scss";

interface CourseProps {
    courseData: CourseItem;
}

const Course = ({ courseData }: CourseProps): JSX.Element => {
    const getRange = (values: PriceItem[]) => {
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

    return (
        <div className="course-item">
            <div>{courseData.name}</div>
            <div>{getRange(courseData.prices)}</div>
        </div>
    );
};

export default Course;

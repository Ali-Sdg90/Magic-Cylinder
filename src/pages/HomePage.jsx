import React, { useEffect, useState } from "react";

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const HomePage = () => {
    const maxBaseValueX = 800;
    const maxBaseValueY = 800;

    const [sizeMultiplier, setSizeMultiplier] = useState(1);

    const [startingLocation_1, setStartingLocation_1] = useState({
        x: randomNumber(0, 95),
        y: randomNumber(0, 95),
        dir_x: randomNumber(0, 1) === 0 ? -1 : 1,
        dir_y: randomNumber(0, 1) === 0 ? -1 : 1,
    });
    const [startingLocation_2, setStartingLocation_2] = useState({
        x: randomNumber(0, 95),
        y: randomNumber(0, 95),
        dir_x: randomNumber(0, 1) === 0 ? -1 : 1,
        dir_y: randomNumber(0, 1) === 0 ? -1 : 1,
    });

    const tickChanger = (prev, sizeMultiplier) => {
        let newX = prev.x + prev.dir_x;
        let newY = prev.y + prev.dir_y;

        const maxValueX =
            ((maxBaseValueX - sizeMultiplier * 10) * 100) / maxBaseValueX;
        const maxValueY =
            ((maxBaseValueY - sizeMultiplier * 10) * 100) / maxBaseValueY;

        console.log(maxValueX);

        if (newX <= 0 || newX >= maxValueX) {
            newX = Math.max(0, Math.min(maxValueX, newX));
            return { ...prev, x: newX, dir_x: -prev.dir_x };
        }

        if (newY <= 0 || newY >= maxValueY) {
            newY = Math.max(0, Math.min(maxValueY, newY));
            return { ...prev, y: newY, dir_y: -prev.dir_y };
        }

        return { ...prev, x: newX, y: newY };
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setStartingLocation_1((prev) => tickChanger(prev, sizeMultiplier));

            setStartingLocation_2((prev) => tickChanger(prev, sizeMultiplier));
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const dx = startingLocation_1.x - startingLocation_2.x;
        const dy = startingLocation_1.y - startingLocation_2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const size = 16 - distance / 7;

        setSizeMultiplier(size);
    }, [
        startingLocation_1.x,
        startingLocation_1.y,
        startingLocation_2.x,
        startingLocation_2.y,
    ]);

    return (
        <div>
            <h1>Home Page</h1>

            <div className="page-box">
                <div
                    className="cylinder-thingi"
                    style={{
                        top: `${startingLocation_1.x}%`,
                        left: `${startingLocation_1.y}%`,
                        width: `${10 * sizeMultiplier}px`,
                        height: `${10 * sizeMultiplier}px`,
                    }}
                >
                    {/* {console.log(startingLocation_1.x, startingLocation_1.y)} */}
                </div>
                <div
                    className="cylinder-thingi"
                    style={{
                        top: `${startingLocation_2.x}%`,
                        left: `${startingLocation_2.y}%`,
                        width: `${10 * sizeMultiplier}px`,
                        height: `${10 * sizeMultiplier}px`,
                    }}
                >
                    {/* {console.log(startingLocation_2.x, startingLocation_2.y)} */}
                </div>

                {/* ignore me */}
                <div
                    className="cylinder-bendi"
                    style={{
                        // clipPath: `${startingLocation_1.x} ${startingLocation_1.y}%, 20% 80%`,
                        clipPath: `${40}% ${10}%, 20% 80%`,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default HomePage;

"use client"

import Point from "@/components/clear-the-point/point"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";

enum StateType {
    READY = "LET IS PLAYING",
    PLAYING = "PLAYING",
    GAMEOVER = "GAME OVER",
    WIN = "ALL CLEARED"
}

export default function Index() {
    const [randomLocation, setRandomLocation] = useState<number[][]>([])
    const [totalPoint, setTotalPoint] = useState(0)
    const [gameState, setGameState] = useState<StateType>(StateType.READY)
    const [gameLable, setGameLable] = useState(true)
    const [gameValue, setGameValue] = useState(1)
    const [timer, setTimer] = useState(0.0)
    const [resetOpacity, setResetOpacity] = useState(false)

    const handleClickPlayButton = () => {
        if (totalPoint > 0) {
            const randomArray = Array.from({ length: totalPoint }, () => [Math.floor(Math.random() * 95), Math.floor(Math.random() * 92), 1])
            setRandomLocation(randomArray)
            setGameLable(false)
            setGameValue(1)
            setGameState(StateType.PLAYING)
            setResetOpacity(true)
            setTimer(0.0)
        }
    }

    useEffect(() => {
        const roundToNearestDecimalUp = (num: number, decimalPlaces: number) => {
            const factor = Math.pow(10, decimalPlaces);
            return Math.ceil(num * factor) / factor;
        };

        let timera = setInterval(() => {
            gameState === StateType.PLAYING ? setTimer(roundToNearestDecimalUp(timer + 0.1, 1)) : ''
        }, 100)

        totalPoint != 0 && gameValue === totalPoint + 1 ? setGameState(StateType.WIN) : ''

        return () => clearInterval(timera)
    }, [gameState, gameValue, totalPoint, timer, gameLable])
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-3/5 mb-3">
                <h1>{gameLable ? 'LET IS PLAY' : gameState}</h1>
                <div className="flex w-1/2 justify-between mt-2">
                    <h5>Points:</h5>
                    <input type="text" className="outline outline-1" onChange={(e) => setTotalPoint(Number(e.target.value) || 0)} />
                </div>
                <div className="flex w-1/2 justify-between mt-2">
                    <h5>Time:</h5>
                    <h5>{timer}s</h5>
                </div>
                <button className="mt-2 px-10 border-2 border-solid border-black" onClick={handleClickPlayButton}>{gameLable ? "Play" : "Restart"}</button>
            </div>
            <div className="w-3/5 relative border-2 border-solid border-black p-2 h-[500px]">
                {
                    randomLocation.map((value, index) => {
                        return (
                            <Point resetOpacity={resetOpacity} setResetOpacity={setResetOpacity} key={index} pointValue={index + 1} location={value} gameValue={gameValue} setGameValue={setGameValue} setGameState={setGameState} />
                        )
                    })
                }

            </div>
        </div>
    )
}

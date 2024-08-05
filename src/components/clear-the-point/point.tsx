import { Dispatch, SetStateAction, use, useEffect, useState } from "react"

enum StateType {
    READY = "LET IS PLAYING",
    PLAYING = "PLAYING",
    GAMEOVER = "GAME OVER",
    WIN = "ALL CLEARED"
}

interface Props {
    pointValue: number
    location: number[]
    gameValue: number
    resetOpacity: boolean
    setGameValue: Dispatch<SetStateAction<number>>
    setGameState: Dispatch<SetStateAction<StateType>>
    setResetOpacity: Dispatch<SetStateAction<boolean>>
}

export default function Point(props: Props) {
    const [isClicked, setClicked] = useState(false)

    const handleClickPoint = () => {
        if (props.gameValue === props.pointValue) {
            setClicked(true);
            props.setGameValue(props.gameValue + 1)
        } else {
            props.setGameState(StateType.GAMEOVER)
        }
    };
    useEffect(() => 
    {
        if(props.resetOpacity)
        {
            setClicked(false)
            props.setResetOpacity(false)
        }
    }, [props, isClicked])
    return (
        <button style={{
            left: `${props.location[0]}%`,
            top: `${props.location[1]}%`,
            position: 'absolute',
            zIndex: `${1000 - props.pointValue}`,
        }}
            className={`bg-[#fff] rounded-full w-10 h-10 border-[1px] border-solid border-black ${isClicked ? 'animate-fadeToRed' : ''} `}
            onClick={handleClickPoint}>
            {props.pointValue}
        </button>
    )
}

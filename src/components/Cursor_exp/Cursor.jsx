import { useStore } from "../../store/store"
import cursorImage from "../../assets/default.png"
import cursorReversedImage from "../../assets/default_reverse.png"
import { useCursorPosition } from "./useCursorPosition"
import { useCursorEvents } from "./useCursorEvents"
import { useCursorWheel } from "./useCursorWheel"
import cls from "./Cursor.module.scss"

export default function Cursor() {
	const position = useCursorPosition()
	const { isCursorReversed, rotation } = useCursorEvents()
	useCursorWheel() // подключаем обработку колесика
	const cursorSize = useStore(state => state.cursorSize)
	const isReflect = useStore(state => state.isReflect)

	return (
		<div
			className={cls.cursor}
			style={{
				left: isReflect ? position.x - 6 : position.x - cursorSize + 6,
				top: position.y,
				backgroundImage: `url(${isCursorReversed ? cursorReversedImage : cursorImage})`,
				width: `${cursorSize}px`,
				height: `${cursorSize * 1.361}px`,
				transform: `${isReflect ? "scaleX(-1)" : ""} rotate(${rotation}deg)`,
			}}
		/>
	)
}

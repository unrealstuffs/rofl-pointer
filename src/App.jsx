import { useEffect, useRef } from "react"
import Controls from "./components/Controls/Controls"
import Cursor from "./components/Cursor_exp/Cursor"
import Hints from "./components/Hints/Hints"
import { useStore } from "./store/store"

export default function App() {
	const bgImage = useStore(state => state.bgImage)
	const bgPosition = useStore(state => state.bgPosition)
	const bgScale = useStore(state => state.bgScale)
	const setFullscreenRef = useStore(state => state.setFullscreenRef)
	const rootRef = useRef(null)

	useEffect(() => {
		setFullscreenRef(rootRef)
	}, [setFullscreenRef])

	const backgroundStyle = bgImage
		? {
				backgroundImage: `url(${bgImage})`,
				backgroundPosition: `${bgPosition.x}px ${bgPosition.y}px`,
				backgroundSize: `${bgScale * 100}%`,
				backgroundRepeat: "no-repeat",
		  }
		: { background: "none" }

	return (
		<div ref={rootRef} className='app' style={backgroundStyle}>
			<Hints />
			<Controls />
			<Cursor />
		</div>
	)
}

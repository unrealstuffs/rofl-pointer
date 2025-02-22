import { useRef, useEffect } from "react"
import soundLoop from "../../assets/ebuchaya_ukazka.wav"

export function useCursorAudio() {
	const loopAudioRef = useRef(null)

	useEffect(() => {
		loopAudioRef.current = new Audio(soundLoop)
		loopAudioRef.current.loop = true
	}, [])

	const playLoopSound = () => {
		loopAudioRef.current?.play()
	}

	const stopLoopSound = () => {
		loopAudioRef.current?.pause()
		loopAudioRef.current.currentTime = 0
	}

	return { playLoopSound, stopLoopSound }
}

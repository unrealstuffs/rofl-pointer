import { create } from "zustand"

export const useStore = create(set => ({
	cursorSize: 100,
	bgImage: null,
	bgPosition: { x: 0, y: 0 },
	bgScale: 0.5,
	fullscreenRef: null,
	isReflect: true,
	isDrag: false,

	setCursorSize: size => set({ cursorSize: size }),
	setBgImage: image => set({ bgImage: image }),
	setBgPosition: position => set({ bgPosition: position }),
	setBgScale: scale => set({ bgScale: scale }),
	setFullscreenRef: ref => set({ fullscreenRef: ref }),
	toggleReflect: () => set(state => ({ isReflect: !state.isReflect })),
	toggleDrag: () => set(state => ({ isDrag: !state.isDrag })),
}))

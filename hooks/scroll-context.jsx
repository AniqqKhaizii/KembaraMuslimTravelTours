"use client";
import { createContext, useContext, useRef, useEffect, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";

const ScrollContext = createContext(null);
export const useLocomotiveScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
	const scrollRef = useRef(null);
	const [scrollInstance, setScrollInstance] = useState(null);

	useEffect(() => {
		if (!scrollRef.current) return;

		const scroll = new LocomotiveScroll({
			el: scrollRef.current,
			smooth: true,
		});
		setScrollInstance(scroll);

		return () => {
			scroll.destroy();
		};
	}, []);

	return (
		<ScrollContext.Provider value={scrollInstance}>
			<div data-scroll-container ref={scrollRef}>
				{children}
			</div>
		</ScrollContext.Provider>
	);
};

// "use client";

// import { useEffect, useRef } from "react";

// export default function useLocomotiveScroll() {
// 	const scrollRef = useRef(null);

// 	useEffect(() => {
// 		let scrollInstance;

// 		import("locomotive-scroll").then((LocomotiveScroll) => {
// 			scrollInstance = new LocomotiveScroll.default({
// 				el: document.querySelector("[data-scroll-container]"),
// 				smooth: true,
// 				smoothMobile: false,
// 			});
// 			scrollRef.current = scrollInstance;
// 		});

// 		return () => {
// 			if (scrollRef.current) scrollRef.current.destroy();
// 		};
// 	}, []);

// 	return scrollRef;
// }

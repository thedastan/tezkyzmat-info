'use client'
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const useAos = () => {
	useEffect(() => {
		Aos.init({
			duration: 800,
			easing: "ease-in-out",
			// once: true, // можно добавить, если нужно однократное воспроизведение
		});
	}, []);
};

export default useAos;
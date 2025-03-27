import React from "react";
import Particles from "@/components/ui/particles";

const Main = () => {
	return (
		<div className="w-full h-screen relative bg-black">
			<Particles
				particleColors={["#ffffff", "#ffffff"]}
				particleCount={200}
				particleSpread={20}
				speed={0.1}
				particleBaseSize={100}
				moveParticlesOnHover={true}
				alphaParticles={false}
				disableRotation={false}
				className={"absolute top-0 left-0 w-full h-full"}
			/>
			<div className="absolute top-0 left-0 w-full h-full bg-[url('/Hero/KembaraDuaTanahSuci.jpg')] bg-cover bg-right-top opacity-25 pointer-events-none"></div>
		</div>
	);
};

export default Main;

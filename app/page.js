import Hero from "./_components/Hero";
import Pakej from "./_components/Pakej";
import Kemudahan from "./_components/Kemudahan";
import Galeri from "./_components/Galeri";
import Testimonial from "./_components/Testimonial";
import KembaraDuaTanahSuci from "./_components/KembaraDuaTanahSuci";
import Tentang from "./_components/Tentang";

export default function Home() {
	return (
		<div className="overflow-x-hidden">
			<Hero />
			<Tentang />
			<Pakej />
			<Kemudahan />
			<Galeri />
			<Testimonial />
			<KembaraDuaTanahSuci />
		</div>
	);
}

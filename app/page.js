import Hero from "./_components/Hero";
import Pakej from "./_components/Pakej";
import Kemudahan from "./_components/Kemudahan";
import Galeri from "./_components/Galeri";
import Testimonial from "./_components/Testimonial";
import KembaraDuaTanahSuci from "./_components/KembaraDuaTanahSuci";
import Tentang from "./_components/Tentang";
import PosterModal from "../components/poster-modal";
export default function Home() {
	return (
		<div className="overflow-x-hidden">
			<PosterModal />
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

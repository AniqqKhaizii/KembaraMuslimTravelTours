import React from "react";
import * as motion from "framer-motion/client";
function Tentang() {
	const tajukVariants = {
		offscreen: {
			y: 100,
		},
		onscreen: {
			y: 0,
			transition: {
				type: "Linear",
				duration: 0.6,
			},
		},
	};

	return (
		<section className=" text-slate-900 pt-[70vh] sm:pt-56">
			<div className="mx-auto max-w-screen-3xl px-4 sm:px-6 lg:px-40 py-10">
				<motion.div
					initial="offscreen"
					whileInView="onscreen"
					variants={tajukVariants}
					className="mx-auto flex flex-col justify-start items-start text-left mb-12"
				>
					<h2 className="text-3xl max-w-5xl font-bold sm:text-4xl text-orange-600">
						Maklumat terkini tentang Kembara Muslim
					</h2>

					<p className="mt-4 font-regular  text-slate-700">
						Jom tunaikan ibadah umrah bersama Kembara Muslim ditemani mutawif
						berpengalaman, nikmati pengalaman rohani yang mendalam dan bermakna.
					</p>
				</motion.div>
				<section>
					<div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
						<ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
							<li>
								<a href="#" className="group relative block">
									<img
										src="https://images.unsplash.com/photo-1618898909019-010e4e234c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
										alt=""
										className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
									/>

									<div className="absolute inset-0 flex flex-col items-start justify-end p-6">
										<h3 className="text-xl font-medium text-white">
											Casual Trainers
										</h3>

										<span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
											Shop Now
										</span>
									</div>
								</a>
							</li>

							<li>
								<a href="#" className="group relative block">
									<img
										src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
										alt=""
										className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
									/>

									<div className="absolute inset-0 flex flex-col items-start justify-end p-6">
										<h3 className="text-xl font-medium text-white">
											Winter Jumpers
										</h3>

										<span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
											Shop Now
										</span>
									</div>
								</a>
							</li>

							<li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
								<a href="#" className="group relative block">
									<img
										src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
										alt=""
										className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
									/>

									<div className="absolute inset-0 flex flex-col items-start justify-end p-6">
										<h3 className="text-xl font-medium text-white">
											Skinny Jeans Blue
										</h3>

										<span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
											Shop Now
										</span>
									</div>
								</a>
							</li>
						</ul>
					</div>
				</section>
			</div>
		</section>
	);
}

export default Tentang;

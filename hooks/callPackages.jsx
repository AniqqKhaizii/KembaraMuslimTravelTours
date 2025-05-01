import Axios from "axios";

export const fetchPackages = async () => {
	try {
		const response = await Axios.get("/api/Tetapan/ManagePackage", {
			params: {
				Operation: "SEARCH",
				TripUnique: "Y",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching packages:", error);
		throw error;
	}
};

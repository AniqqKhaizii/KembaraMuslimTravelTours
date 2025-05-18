"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function useCurrentUser() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get("/api/auth/Session");
				setUser(res.data.user);
			} catch (err) {
				console.error("Failed to load user:", err);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	return { user, loading };
}

"use client";
import { Modal } from "antd";
import { useEffect, useState } from "react";

const PosterModal = () => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const hasVisited = localStorage.getItem("hasVisited");
		if (!hasVisited) {
			setIsVisible(true);
			localStorage.setItem("hasVisited", "true");
		}
	}, []);

	const handleClose = () => {
		setIsVisible(false);
	};

	return (
		<Modal
			open={isVisible}
			onOk={handleClose}
			onCancel={handleClose}
			footer={null}
			closable={true}
			className="poster-modal text-white"
			style={{ padding: 0 }}
			centered
		>
			<div className="poster-img-wrapper" />
		</Modal>
	);
};

export default PosterModal;

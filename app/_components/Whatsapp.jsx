"use client";
import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function Whatsapp() {
	return (
		<div className="App">
			<FloatingWhatsApp
				phoneNumber="01124152154"
				accountName="Kembara Muslim"
				avatar="/KMTT_Avatar.jpg"
				statusMessage="Sentiasa Menanti Anda"
				chatMessage="Assalamualaikum Wbt ! Silakan Hubungi Kami"
				allowEsc
				notification
				notificationSound
			/>
		</div>
	);
}

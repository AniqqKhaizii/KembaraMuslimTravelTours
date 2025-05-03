import { Appearance, useAppearance } from "@/hooks/use-appearance";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

export default function AppearanceToggleTab({ className = "", ...props }) {
	const { appearance, updateAppearance } = useAppearance();

	const tabs = [
		{ value: "light", icon: Sun, label: "Light" },
		{ value: "dark", icon: Moon, label: "Dark" },
	];

	return (
		<div
			className={cn(
				"inline-flex gap-1 rounded-full bg-neutral-100/30 p-1 dark:bg-neutral-800/30 border border-gray-100/30 dark:border-gray-800/30",
				className
			)}
			{...props}
		>
			{tabs.map((tab) => (
				<button
					key={tab.value}
					onClick={() => updateAppearance(tab.value)}
					className={cn(
						"flex items-center rounded-full px-3.5 py-0.5 transition-colors",
						appearance === tab.value
							? "bg-white/30 shadow-xs dark:bg-neutral-700/60 dark:text-neutral-100 text-neutral-700"
							: "text-neutral-700 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"
					)}
				>
					<tab.icon className="-ml-1 h-4 w-4" />
					<span className="ml-1.5 text-sm">{tab.label}</span>
				</button>
			))}
		</div>
	);
}

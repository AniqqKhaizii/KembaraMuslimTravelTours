import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const Word = ({
	isWordMode,
	word,
	index,
	offset,
	delay,
	duration,
	className,
	length,
}) => {
	if (isWordMode) {
		return word;
	}

	return (
		<>
			{word.split("").map((letter, letterIndex) => (
				<span
					key={`${letter}_${letterIndex}_${index}`}
					className={cn({ [className]: !isWordMode })}
					style={{
						animationDuration: `${duration}`,
						animationDelay: createDelay({
							index: letterIndex,
							offset,
							delay,
						}),
					}}
				>
					{letter}
				</span>
			))}
		</>
	);
};

const createDelay = ({ offset, index, delay }) => {
	return delay + (index + offset) * 50 + "ms";
};

const createAnimatedNodes = (args, word, index) => {
	const {
		nodes,
		offset,
		wordsLength,
		textLength,
		mode,
		direction,
		duration,
		delay,
		blur,
	} = args;

	const isWordMode = mode === "word";
	const isUp = direction === "up";
	const length = isWordMode ? wordsLength : textLength;
	const isLast = index === length - 1;

	const className = cn(
		"inline-block opacity-0 transition-all ease-in-out fill-mode-forwards",
		{
			["animate-[reveal-down]"]: !isUp && !blur,
			["animate-[reveal-up]"]: isUp && !blur,
			["animate-[reveal-down,content-blur]"]: !isUp && blur,
			["animate-[reveal-up,content-blur]"]: isUp && blur,
		},
		args.className
	);

	const node = (
		<span
			key={`word_${index}`}
			className={cn("contents", { [className]: isWordMode })}
			style={
				isWordMode
					? {
							animationDuration: `${duration}`,
							animationDelay: createDelay({
								index,
								offset,
								delay,
							}),
					  }
					: undefined
			}
		>
			<Word
				isWordMode={isWordMode}
				word={word}
				index={index}
				offset={offset}
				duration={duration}
				className={className}
				length={length}
				delay={delay}
			/>
			{!isLast && " "}
		</span>
	);

	return {
		...args,
		nodes: [...nodes, node],
		offset: offset + (isWordMode ? 1 : word.length + 1),
	};
};

export default function WaveReveal({
	text,
	direction = "down",
	mode = "letter",
	className,
	duration = "2000ms",
	delay = 0,
	blur = true,
	letterClassName,
}) {
	if (!text) return null;

	const words = text.trim().split(/\s/);

	const { nodes } = words.reduce(createAnimatedNodes, {
		nodes: [],
		offset: 0,
		wordsLength: words.length,
		textLength: text.length,
		direction,
		mode,
		duration: duration ?? 60,
		delay: delay ?? 0,
		blur,
		className: letterClassName,
	});

	return (
		<div
			className={cn(
				"relative flex flex-wrap justify-center whitespace-pre px-2 text-4xl font-black md:px-6 md:text-7xl",
				className
			)}
		>
			{nodes}
			<div className="sr-only">{text}</div>
		</div>
	);
}

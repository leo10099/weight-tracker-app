import { Gender } from "../@types/gender";

export const getIdealWeight = (gender: Gender, height: number): number => {
	let ideal = 0;

	if (gender === "H") {
		ideal = (height - 150) * 0.75 + 50;
	} else {
		ideal = (height - 150) * 0.6 + 50;
	}

	return Math.round(ideal);
};

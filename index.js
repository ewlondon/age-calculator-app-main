const date = new Date().toLocaleDateString();
const [yearResult, monthResult, dayResult] = document.querySelectorAll(
	'.calculator-result >span'
);
const age = {
	day: '',
	month: '',
	year: '',
};

function handleChange(e) {
	if (e.name === 'Day')
		age.day = Number(e.value) > 0 ? (e.value <= 31 ? e.value : '') : '';
	if (e.name === 'Month')
		age.month = Number(e.value) > 0 ? (e.value <= 12 ? e.value : '') : '';
	if (e.name === 'Year')
		age.year = Number(e.value) > 0 ? (e.value >= 1900 ? e.value : '') : '';
	if (age.day && age.month && age.year.length > 3) {
		const yourAge = calculateAge(`${age.year}-${age.month}-${age.day}`);
		dayResult.innerText = yourAge.days;
		monthResult.innerText = yourAge.months;
		yearResult.innerText = yourAge.years;
	}
}

function calculateAge(birthdate) {
	const birthDateObj = new Date(birthdate);

	const currentDate = new Date();

	let ageInYears = currentDate.getFullYear() - birthDateObj.getFullYear();
	let ageInMonths = currentDate.getMonth() - birthDateObj.getMonth();
	let ageInDays = currentDate.getDate() - birthDateObj.getDate();

	if (
		currentDate.getMonth() < birthDateObj.getMonth() ||
		(currentDate.getMonth() === birthDateObj.getMonth() &&
			currentDate.getDate() < birthDateObj.getDate())
	) {
		ageInYears -= 1;
		ageInMonths += 12;
	}

	if (ageInDays < 0) {
		const lastMonthDays = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			0
		).getDate();
		ageInMonths -= 1;
		ageInDays = lastMonthDays + ageInDays;
	}

	return {
		years: ageInYears,
		months: ageInMonths,
		days: ageInDays,
	};
}

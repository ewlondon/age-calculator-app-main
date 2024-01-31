const date = new Date().toLocaleDateString();
const [yearResult, monthResult, dayResult] = document.querySelectorAll(
	'.calculator-result >span'
);
const age = {
	day: '',
	month: '',
	year: '',
};

console.log(date);

function handleChange(e) {
	if (e.name === 'Day') age.day = e.value;
	if (e.name === 'Month') age.month = e.value;
	if (e.name === 'Year') age.year = e.value;
	if (age.day && age.month && age.year.length > 3) {
		const [month, day, year] = date.split('/');
		console.log(month, day, year);
		console.log(age.month, age.day, age.year);
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

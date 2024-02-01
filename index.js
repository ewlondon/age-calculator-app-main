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
	if (e.name === 'Day') age.day = e.value.length > 1 ? e.value : '0' + e.value;
	if (e.name === 'Month') age.month = e.value;
	if (e.name === 'Year') age.year = e.value;
	if (validDate(age)) {
		const [yourYears, yourMonths, yourDays] = calculateAge(
			`${age.year}-${age.month}-${age.day}`
		);

		dayResult.innerText = yourDays;
		monthResult.innerText = yourMonths;
		yearResult.innerText = yourYears;
	} else {
		dayResult.innerText = '--';
		monthResult.innerText = '--';
		yearResult.innerText = '--';
	}
}

function validDate(age) {
	if (age.day.length <= 1) return false;
	if (age.month.length < 1) return false;
	if (age.year.length <= 3) return false;
	return true;
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

	return [ageInYears, ageInMonths, ageInDays];
}

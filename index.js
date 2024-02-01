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
		age.day =
			(e.value.value > 31) | (e.value < 1)
				? alert('Please enter digits between 1-31')
				: e.value;
	if (e.name === 'Month')
		age.month =
			(e.value > 12) | (e.value < 1)
				? alert('Please enter digits between 1-12')
				: e.value;
	if (e.name === 'Year')
		age.year =
			(e.value.length > 3 && e.value < 1900) | (e.value > date.split('/')[2])
				? alert('Please enter digits between 1900-' + date.split('/')[2])
				: e.value;
	if (validDate(age)) {
		const [yourYears, yourMonths, yourDays] = calculateAge(
			`${age.year}-${age.month}-${age.day}`
		);
		animateCountUp(dayResult,yourDays, 80);
		animateCountUp(monthResult,yourMonths, 80);
		animateCountUp(yearResult,yourYears, 80);

	} else {
		dayResult.innerText = '--';
		monthResult.innerText = '--';
		yearResult.innerText = '--';
	}
}

function animateCountUp(inputField, targetNumber, duration) {
	const startNumber = 0;
	const intervalTime = Math.max(
		10,
		duration / Math.abs(targetNumber - startNumber)
	); 
	const increment = targetNumber > startNumber ? 1 : -1;

	let currentNumber = startNumber;

	const intervalId = setInterval(() => {
		inputField.innerText = currentNumber;

		if (currentNumber === targetNumber) {
			clearInterval(intervalId);
		} else {
			currentNumber += increment;
		}
	}, intervalTime);
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

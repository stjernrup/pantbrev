export const calculateRepaymentNeed = ({
	salary,
	price,
	loan
}: {
	salary: number;
	price: number;
	loan: number;
}) => {
	let repaymentNeed = 0;
	const loanPercent = loan / price;
	if (loanPercent > 0.7) {
		repaymentNeed = 2;
	} else if (loanPercent > 0.5) {
		repaymentNeed = 1;
	}
	if (loan > salary * 12 * 4.5) {
		repaymentNeed = repaymentNeed + 1;
	}

	return repaymentNeed;
};

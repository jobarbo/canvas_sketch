export default class CA {
	constructor() {
		this.margin = 300;
		this.innerWidth = width - this.margin * 2;
		this.cw = this.innerWidth / 20;

		this.cells = this.makeCells();
		this.ruleset = [0, 1, 0, 1, 1, 0, 1, 0];

		console.log(this.cells);
	}

	makeCells() {
		const numCol = this.innerWidth / this.cw;
		let cellArr = new Array();

		//All cells start with state 0, except the center cell has state 1.
		for (let i = 0; i < numCol; i++) {
			cellArr.push(0);
		}
		cellArr[cellArr.length / 2 - 1] = 1;
		return cellArr;
	}

	generate() {
		const nextGen = this.cells;
		for (let i = 1; i < this.cells.length - 1; i++) {
			let left = this.cells[i - 1];
			let middle = this.cells[i];
			let right = this.cells[i + 1];

			let newstate = rules(left, middle, right);
			nextGen[i] = newstate;
		}
		this.cells = nextGen;
	}

	rules(left, middle, right) {
		let string = '' + left + middle + right + '';
		let index = parseInt(string, 2);

		return ruleset[index];
	}
}

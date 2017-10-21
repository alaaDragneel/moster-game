new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		logs: []
	},
	methods: {
		startGame () {
			this.gameIsRunning 	= true;
			this.playerHealth 	= 100;
			this.monsterHealth	= 100;
			this.logs = [];
			this.addNewLog(false, 'Game Start', 'success');
		},
		endGame () {
			this.gameIsRunning 	= false;
			this.logs = [];
			this.addNewLog(false, 'Game End', 'danger');
		},
		attack () {

			var damage = this.calculateDamage(3, 10);

			this.monsterHealth -= damage;

			this.addNewLog(true, 'Player Hits Monster For ' + damage + ' Points', 'info');

			if (this.checkIfWin()) { // Stop Code Excution if monster or we lost
				return;
			}

			this.monsterAttacks();
		},
		specialAttack () {
			
			var damage = this.calculateDamage(10, 20);
			
			this.monsterHealth -= damage;

			this.addNewLog(true, 'Player Hits Monster For ' + damage + ' Points', 'info');

			if (this.checkIfWin()) { // Stop Code Excution if monster or we lost
				return;
			}

			this.monsterAttacks();
		},
		heal () {
			if (this.playerHealth <= 90) {
				this.playerHealth += 10;
			} else {
				this.playerHealth = 100;
			}

			this.addNewLog(false, ' Heal ', 'info');

			this.monsterAttacks();
		},
		giveUp () {
			this.gameIsRunning 	= false;
			this.logs = [];
			this.addNewLog(false, 'You Give Up What Are You Losser ?', 'danger');
		},
		monsterAttacks () {
			
			var damage = this.calculateDamage(5, 12);

			this.playerHealth -= damage;
			
			this.addNewLog(false, 'Monster Hits Player For ' + damage + ' Points', 'warning');
			
			this.checkIfWin(); // no code Excution No need for if statment			
		},
		calculateDamage (min, max) {

			// Math.random Give randome Float Number From 0 to 1
			// Multible It With The Max Number
			// get the Floor Number of it [ Math.floor ] will return from 0 -9 
			// Add [ 1 ] to return from 1 - 10
			// Math.max [ if the random number is [ 1, 2, 3 ] it will take The [ var min ] else Will Take the randome number ]

			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		checkIfWin () {
			if (this.monsterHealth <= 0) {
				this.monsterHealth = 0; // to avoid < 0 results
				this.addNewLog(false, 'You Won!', 'success');
				if (confirm('You Won! New Game?')) {
					this.startGame();
				} else {
					this.endGame();
				}
				return true;
			} else if (this.playerHealth <= 0) {
				this.playerHealth = 0; // to avoid < 0 results
				this.addNewLog(false, 'You Lost!', 'danger');
				if (confirm('You Lost! New Game?')) {
					this.startGame();
				} else {
					this.endGame();
				}
				return true;
			}
		},
		addNewLog (isPlayer, text, color) {
			this.logs.unshift({isPlayer: isPlayer, text: text, color: color});
		}

	}
});
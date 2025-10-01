class MemoryGame {
    constructor() {
        this.level = 1;
        this.score = 0;
        this.lives = 3;
        this.sequence = [];
        this.playerSequence = [];
        this.isPlaying = false;
        this.isShowingSequence = false;
        
        this.colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE'
        ];
        
        this.initializeGame();
        this.bindEvents();
    }

    initializeGame() {
        this.updateGameBoard();
        this.updateDisplay();
    }

    bindEvents() {
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());
    }

    startGame() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.sequence = [];
        this.playerSequence = [];
        this.level = 1;
        this.score = 0;
        this.lives = 3;
        
        this.updateDisplay();
        this.showMessage('Game started! Watch the sequence carefully.', 'info');
        this.generateSequence();
        this.showSequence();
    }

    resetGame() {
        this.isPlaying = false;
        this.isShowingSequence = false;
        this.sequence = [];
        this.playerSequence = [];
        this.level = 1;
        this.score = 0;
        this.lives = 3;
        
        this.updateDisplay();
        this.showMessage('Game reset. Click Start to play!', 'info');
        this.updateGameBoard();
    }

    generateSequence() {
        this.sequence = [];
        const sequenceLength = this.level + 2; // Increase complexity with level
        
        for (let i = 0; i < sequenceLength; i++) {
            const randomIndex = Math.floor(Math.random() * 9);
            this.sequence.push(randomIndex);
        }
    }

    async showSequence() {
        this.isShowingSequence = true;
        this.disableTiles();
        
        const tiles = document.querySelectorAll('.tile');
        
        for (let i = 0; i < this.sequence.length; i++) {
            const tileIndex = this.sequence[i];
            const tile = tiles[tileIndex];
            
            // Highlight the tile
            tile.style.backgroundColor = this.colors[tileIndex];
            tile.classList.add('sequence');
            
            await this.sleep(600 - (this.level * 50)); // Speed increases with level
            
            // Reset the tile
            tile.style.backgroundColor = '#e9ecef';
            tile.classList.remove('sequence');
            
            await this.sleep(200);
        }
        
        this.isShowingSequence = false;
        this.enableTiles();
        this.showMessage('Your turn! Repeat the sequence.', 'info');
    }

    handleTileClick(index) {
        if (!this.isPlaying || this.isShowingSequence) return;
        
        const tiles = document.querySelectorAll('.tile');
        const tile = tiles[index];
        
        // Visual feedback
        tile.style.backgroundColor = this.colors[index];
        setTimeout(() => {
            if (this.isPlaying && !this.isShowingSequence) {
                tile.style.backgroundColor = '#e9ecef';
            }
        }, 300);
        
        this.playerSequence.push(index);
        
        // Check if the move is correct
        const currentMove = this.playerSequence.length - 1;
        if (this.playerSequence[currentMove] !== this.sequence[currentMove]) {
            this.handleWrongMove();
            return;
        }
        
        // Check if sequence is complete
        if (this.playerSequence.length === this.sequence.length) {
            this.handleLevelComplete();
        }
    }

    handleWrongMove() {
        this.lives--;
        this.showMessage('Wrong sequence! Try again.', 'error');
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.playerSequence = [];
            this.updateDisplay();
            setTimeout(() => this.showSequence(), 1500);
        }
    }

    handleLevelComplete() {
        this.level++;
        this.score += this.level * 10;
        this.playerSequence = [];
        
        this.updateDisplay();
        this.showMessage(`Level ${this.level - 1} complete! Great job!`, 'success');
        
        setTimeout(() => {
            this.generateSequence();
            this.showSequence();
        }, 1500);
    }

    gameOver() {
        this.isPlaying = false;
        this.showMessage(`Game Over! Final Score: ${this.score}`, 'error');
        this.disableTiles();
    }

    updateGameBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.index = i;
            tile.addEventListener('click', () => this.handleTileClick(i));
            gameBoard.appendChild(tile);
        }
    }

    updateDisplay() {
        document.getElementById('level').textContent = this.level;
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
    }

    showMessage(text, type) {
        const messageEl = document.getElementById('message');
        messageEl.textContent = text;
        messageEl.className = `message ${type}`;
    }

    disableTiles() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.style.pointerEvents = 'none';
            tile.style.opacity = '0.6';
        });
    }

    enableTiles() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.style.pointerEvents = 'auto';
            tile.style.opacity = '1';
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});
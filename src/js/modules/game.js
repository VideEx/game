import {Snake} from "./snake.js";
import {Food} from "./food.js";

export class Game {
    context = null;
    positionCount = null;
    positionSize  = null;

    snake = null;

    score = 0;
    scoreElement = null;
    interval = null;

    constructor(context, settings) {
        this.context = context;

        this.positionCount = settings.positionCount;
        this.positionSize = settings.positionSize;

        this.scoreElement = document.getElementById('score')

        document.getElementById('start').onclick = () => {
            this.startGame();
        }
    }

    startGame() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.food = new Food(this.context, this.positionSize, this.positionCount);
        this.snake = new Snake(this.context, this.positionSize, this.positionCount);

        this.food.setNewFoodPosition();

        this.interval = setInterval(this.gameProcess.bind(this), 100);
    };

    gameProcess() {
        this.context.clearRect(0, 0, this.positionCount * this.positionSize, this.positionCount * this.positionSize)

        // this.showGrid();
        this.food.showFood();
        let result = this.snake.showSnake(this.food.foodPosition);

        if (result) {
            if (result.collision) {
                this.endGame();
            } else if (result.gotFood) {
                this.score += 1
                this.scoreElement.innerText = this.score;

                this.food.setNewFoodPosition();
            }
        }
    };

    showGrid() {
        const size = this.positionCount * this.positionSize;
        for (let x = 0; x <= size; x += this.positionSize) {
            this.context.moveTo(0.5 + x + this.positionSize, 0);
            this.context.lineTo(0.5 + x + this.positionSize, size + this.positionSize);
        }

        for (let x = 0; x <= size; x +=  this.positionSize ) {
            this.context.moveTo(0, 0.5 + x + this.positionSize);
            this.context.lineTo(size + this.positionSize, 0.5 + x + this.positionSize);
        }
        this.context.strokeStyle = '#e3cce3';
        this.context.stroke();
    }

    endGame() {
        clearInterval(this.interval);

        this.context.fillStyle = 'black';
        this.context.font = 'bold 48px Muller';
        this.context.textAlign = 'center';
        this.context.fillText('Вы набрали: ' + this.score + ' очков', (this.positionCount * this.positionSize)/2, (this.positionCount * this.positionSize)/2)
    }
}
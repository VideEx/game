import {ColorUtils} from "../utils/color-util.js";

export class Snake {

    color = ['#e9eb83', '#acad5a', '#dadba0'];

    currentDirection = 'right';

    snake = [
        {
            x: 10,
            y: 20
        }
    ];
    context = null;
    positionCount = null;
    positionSize  = null;

    constructor(context, positionSize, positionCount) {
        this.context = context;

        this.positionCount = positionCount;
        this.positionSize = positionSize;

        this.addKeyboardHandler();
    }

    addKeyboardHandler() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && this.currentDirection !== 'right') {
                this.currentDirection = 'left';
            } else if (e.key === 'ArrowRight' && this.currentDirection !== 'left') {
                this.currentDirection = 'right';
            } else if (e.key === 'ArrowUp' && this.currentDirection !== 'down') {
                this.currentDirection = 'up';
            } else if (e.key === 'ArrowDown' && this.currentDirection !== 'up') {
                this.currentDirection = 'down';
            }
        })
    }

    showSnake(foodPosition) {
        let result = {
            gotFood: false,
            collision: false
        };

        for (let i = 0; i < this.snake.length; i++ ) {
            this.context.fillStyle = '#cfeb34';
            this.context.beginPath();
            this.context.fillRect(this.snake[i].x * this.positionSize - this.positionSize, this.snake[i].y * this.positionSize - this.positionSize, this.positionSize, this.positionSize);
        }

        let newHeadPosition = {
            x: this.snake[0].x,
            y: this.snake[0].y,
        }

        if (foodPosition && foodPosition.x === newHeadPosition.x && foodPosition.y === newHeadPosition.y) {
            result.gotFood = true;
        } else {
            this.snake.pop();
        }

        if (this.currentDirection === 'left') {
            if (newHeadPosition.x === 1) {
                newHeadPosition.x = this.positionCount;
            } else {
                newHeadPosition.x -= 1;
            }
        }else if (this.currentDirection === 'right') {
            if (newHeadPosition.x === this.positionCount) {
                newHeadPosition.x = 1;
            } else {
                newHeadPosition.x += 1;
            }
        }else if (this.currentDirection === 'up') {
            if (newHeadPosition.y === 1) {
                newHeadPosition.y = this.positionCount;
            } else {
                newHeadPosition.y -= 1;
            }
        }else if (this.currentDirection === 'down') {
            if (newHeadPosition.y === this.positionCount) {
                newHeadPosition.y = 1;
            } else {
                newHeadPosition.y += 1;
            }
        }

        if (!this.checkNewHeadPositionForCollision(newHeadPosition)) {
            this.snake.unshift(newHeadPosition);
        } else {
            result.collision = true;
        }


        return result;
    }

    checkNewHeadPositionForCollision(newHeadPosition) {
        for (let i = 0; i < this.snake.length; i++) {
            if (newHeadPosition.x === this.snake[i].x && newHeadPosition.y === this.snake[i].y) {
                return true;
            }
        }

        return false;
    }
}
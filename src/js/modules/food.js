import {NumberUtils} from "../utils/number-utils.js";
import {ColorUtils} from "../utils/color-util.js";

export class Food {
    color = '#eb3734';

    context = null;
    positionCount = null;
    positionSize = null;
    foodRadius = null;

    foodPosition = {
        x: 1,
        y: 1
    }

    constructor(context, positionSize, positionCount) {
        this.context = context;

        this.positionCount = positionCount;
        this.positionSize = positionSize;

        this.foodRadius = this.positionSize / 2;
    }

    setNewFoodPosition() {
        // console.log('sdfvksdvm')
        this.foodPosition =
            {
                x: NumberUtils.getRandomInt(1, this.positionCount),
                y: NumberUtils.getRandomInt(1, this.positionCount)
            }
    }

    showFood() {
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.foodPosition.x * this.positionSize - this.foodRadius,
            this.foodPosition.y * this.positionSize - this.foodRadius, this.foodRadius,
            0, 2 * Math.PI)

        this.context.fill();
    }
}
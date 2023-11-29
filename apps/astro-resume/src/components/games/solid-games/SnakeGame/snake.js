import { GRID_SIZE, DIRECTIONS } from './constants.js';

export class Snake {
    /**
     * @type {DIRECTIONS[keyof typeof DIRECTIONS]}
     */
    direction;
    /**
     * @type {DIRECTIONS[keyof typeof DIRECTIONS] | null}
     */
    pendingDirection = null;
    previousDirection = null;
    /**
     * @param {{width: number, height: number}} stageSize
     * @param {{x: number, y: number}} pos
     * @param {DIRECTIONS[keyof typeof DIRECTIONS]} direction
     */
    constructor(stageSize, pos, direction) {
        this.direction = direction;
        this.shouldGrow = false;
        this.stageSize = stageSize;
        this.previousDirection = direction;
        switch (this.direction) {
            case DIRECTIONS.UP:
                this.body = [
                    pos,
                    { x: pos.x, y: pos.y + 1 },
                    { x: pos.x, y: pos.y + 1 * 2 },
                ];
                break;
            case DIRECTIONS.DOWN:
                this.body = [
                    pos,
                    { x: pos.x, y: pos.y - 1 },
                    { x: pos.x, y: pos.y - 1 * 2 },
                ];
                break;
            case DIRECTIONS.LEFT:
                this.body = [
                    pos,
                    { x: pos.x + 1, y: pos.y },
                    { x: pos.x + 1 * 2, y: pos.y },
                ];
                break;
            case DIRECTIONS.RIGHT:
                this.body = [
                    pos,
                    { x: pos.x - 1, y: pos.y },
                    { x: pos.x - 1 * 2, y: pos.y },
                ];
                break;
        }
    }

    /**
     * @param {DIRECTIONS[keyof typeof DIRECTIONS]} direction
     */
    changeDirection(direction) {
        if (this.direction !== this.previousDirection) {
            this.pendingDirection = direction;
            return;
        }
        // Change the direction of the snake
        if (
            (direction === DIRECTIONS.UP &&
                this.previousDirection === DIRECTIONS.DOWN) ||
            (direction === DIRECTIONS.DOWN &&
                this.previousDirection === DIRECTIONS.UP) ||
            (direction === DIRECTIONS.LEFT &&
                this.previousDirection === DIRECTIONS.RIGHT) ||
            (direction === DIRECTIONS.RIGHT &&
                this.previousDirection === DIRECTIONS.LEFT)
        ) {
            return;
        }
        this.direction = direction;
    }

    update() {
        // Update snake position based on direction
        const direction = this.direction;
        this.previousDirection = direction;
        if (this.pendingDirection) this.direction = this.pendingDirection;
        this.pendingDirection = null;
        if (!this.shouldGrow) {
            this.body.pop();
        }
        this.shouldGrow = false;
        switch (direction) {
            case DIRECTIONS.UP:
                this.body.unshift({
                    x: this.body[0].x,
                    y: this.body[0].y - 1,
                });
                break;
            case DIRECTIONS.DOWN:
                this.body.unshift({
                    x: this.body[0].x,
                    y: this.body[0].y + 1,
                });
                break;
            case DIRECTIONS.LEFT:
                this.body.unshift({
                    x: this.body[0].x - 1,
                    y: this.body[0].y,
                });
                break;
            case DIRECTIONS.RIGHT:
                this.body.unshift({
                    x: this.body[0].x + 1,
                    y: this.body[0].y,
                });
                break;
        }
    }

    lengthReset(startingLength = 3) {
        while (this.body.length > startingLength) {
            this.body.pop();
        }
    }

    grow() {
        // Increase the length of the snake
        this.shouldGrow = true;
    }

    /**
     * @param {{x: number, y: number}} food
     */
    collidesWithFood(food) {
        // Check if the snake collides with the food
        return this.body[0].x === food.x && this.body[0].y === food.y;
    }

    collidesWithWall() {
        // Check if the snake collides with the wall
        if (this.body[0].x >= this.stageSize.width || this.body[0].x < 0) {
            return true;
        }
        if (this.body[0].y >= this.stageSize.height || this.body[0].y < 0) {
            return true;
        }
        return false;
    }

    collidesWithSelf() {
        // Check if the snake collides with itself
        for (let i = 1; i < this.body.length; i++) {
            if (
                this.body[0].x === this.body[i].x &&
                this.body[0].y === this.body[i].y
            ) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        this.body.forEach(({ x, y }) => {
            ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        });
        // Render the snake on the canvas
    }
}
export default Snake;

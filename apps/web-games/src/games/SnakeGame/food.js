import { GRID_SIZE } from './constants.js';

export class Food {
    /**
     *
     * @param {{width: number, height: number}} stageSize
     */
    constructor(stageSize) {
        this.stageSize = stageSize;
        this.position = { x: 0, y: 0 };
        this.spawn();
    }

    spawn() {
        // Generate a random position for the food
        const widthInGrids = Math.floor(this.stageSize.width);
        const heightInGrids = Math.floor(this.stageSize.height);

        this.position = {
            x: Math.floor(Math.random() * widthInGrids),
            y: Math.floor(Math.random() * heightInGrids),
        };
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        // Render the food on the canvas
        ctx.fillRect(
            this.position.x * GRID_SIZE,
            this.position.y * GRID_SIZE,
            GRID_SIZE,
            GRID_SIZE
        );
    }
}

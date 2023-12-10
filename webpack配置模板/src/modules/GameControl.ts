import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";

export default class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    direction: string = 'ArrowRight';
    isLive: boolean = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(5, 5);

        this.init()
    }


    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run()
    }

    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key;
    }

    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch (this.direction) {
            case "ArrowUp":
                Y -= 10;
                break;
            case "ArrowDown":
                Y += 10;
                break;
            case "ArrowLeft":
                X -= 10;
                break;
            case "ArrowRight":
                X += 10;
                break;
        }

        this.checkEat(X, Y);

        try{
            this.snake.X = X;
            this.snake.Y = Y;
        }catch (e){
            alert(e)
            this.isLive = false
        }

        

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

    checkEat (X: number, Y: number) {
        console.log('蛇的坐标: ', this.snake.X, this.snake.Y);
        console.log('食物的坐标: ', X, Y);
        if (X === this.food.X && Y === this.food.Y) {
            console.log('吃到食物了! ');
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }
}



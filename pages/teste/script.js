class Vector2{
    constructor(x=0, y=0){
        this.x = x;
        this.y = y;
    }
    get text(){
        return `(${this.x}, ${this.y})`;
    }
    add(other){
        if (typeof other == "number"){
            return new Vector2(this.x+other, this.y+other);
        }else{
            return new Vector2(this.x+other.x, this.y+other.y);
        }
    }
    sub(other){
        if (typeof other == "number"){
            return new Vector2(this.x-other, this.y-other);
        }else{
            return new Vector2(this.x-other.x, this.y-other.y);
        }
    }
    mul(other){
        if (typeof other == "number"){
            return new Vector2(this.x*other, this.y*other);
        }else{
            return new Vector2(this.x*other.x, this.y*other.y);
        }
    }
    div(other){
        if (typeof other == "number"){
            return new Vector2(this.x/other, this.y/other);
        }else{
            return new Vector2(this.x/other.x, this.y/other.y);
        }
    }
    magnitude(){
        return Math.sqrt(this.x**2+this.y**2);
    }
    unit(){
        return this.div(this.magnitude());
    }
}


let screenSize = new Vector2(process.stdout.columns, process.stdout.rows);

let screen = {
    size: new Vector2(process.stdout.columns, process.stdout.rows),
    screen: [],
    fill: (char="x") => {
        screen = [];
        for (let i = 0; i<screenSize.x*screenSize.y; i++){
            screen.push(char);
        }
    },
    drawPixel: (char, position) => {

    },
    refresh(){
        for (let y = 0; y<screen.size.y; y++){
            let line = ""
            for (let x = 0; x<screen.size.x; x++){
                line += screen.screen[y*screen.size.x+x];   
            }
            console.log(line);
        }
    }
};

process.stdout.on('resize', () => {
    const {columns, rows} = process.stdout;
    screen.size = new Vector2(columns, rows);
});



const game = {
    FPS: 12,
    updateFrame: () => {},
    drawFrame: () => {},
    _loop: () => {
        screen.fill("a");
        screen.drawPixel("O", new Vector2(0, 0));
        screen.refresh();
        game.updateFrame();
        game.drawFrame();
    },
    start: () => {
        setInterval(game._loop, 1/game.FPS*1000);
    },
};
game.start();
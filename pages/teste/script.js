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
    screenCharacteres: [],
    fill: (char="x") => {
        screen.screenCharacteres = [];
        for (let i = 0; i<screenSize.x*screenSize.y; i++){
            screen.screenCharacteres.push(char);
        }
    },
    drawPixel: (char, position) => {
        position = new Vector2(Math.abs(position.x), Math.abs(position.y));
        let index = position.y*screenSize.x+position.x;
        screen.screenCharacteres[index] = char;
    },
    refresh(){
        process.stdout.write('\x1Bc');
        for (let y = 0; y<screen.size.y; y++){
            let line = ""
            for (let x = 0; x<screen.size.x; x++){
                line += screen.screenCharacteres[y*screen.size.x+x];   
            }
            console.log(line);
        }
    }
};

process.stdout.on('resize', () => {
    const {columns, rows} = process.stdout;
    screenSize = new Vector2(columns, rows);
});


const game = {
    FPS: 12,
    world: [],
    updateFrame: (dt) => {},
    drawFrame: () => {},
    _loop: () => {
        game.updateFrame(1/game.FPS);
        for (const object of game.world){
            screen.drawPixel("O", object.position);
        }
        screen.fill(" ");
        game.drawFrame();
        screen.refresh();
    },
    start: () => {
        setInterval(game._loop, 1/game.FPS*1000);
    },
};
game.start();

class GameObject{
    constructor(name, size, position){
        this.name = name;
        this.size = size;
        this.position = position;
        game.world.push(this);
    }
}

let particle = new GameObject("aa", new Vector2(1, 1), new Vector2(0, 0));

for (let i = 0; i<10; i++){
    let particle = new GameObject(i, new Vector2(1, 1), new Vector2(Math.random()*10, Math.random()*10));
}

game.updateFrame = (dt) => {

}

game.drawFrame = () => {

}
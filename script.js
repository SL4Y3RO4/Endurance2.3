//async
(async() => {

    let app = new PIXI.Application();
    await app.init({

        width: window.innerWidth = 1900,
        height: window.innerHeight,
        backgroundColor: 0x3a3a3a
    });

    document.body.appendChild(app.canvas);

    //setup
    let score = 0;
    let target;
    const targetSize = 60;
    let scoreText;
    let s = 30;
    let fpsText;
    let lastFrameTime;
    let sound;
    let cursor;
    const cursorSize = 30;
    let SnStartcommand;
    let Rcommand;
    let rgb;
    let n;

    //assets
    scoreText = new PIXI.Text('Score:0', {fontSize:32, fill:0x000000});
    scoreText.position.set(10, 10);
    app.stage.addChild(scoreText);

    let timerText = new PIXI.Text('Seconds:30', {fontSize:32, fill:0x000000});
    timerText.position.set(10, 45);
    app.stage.addChild(timerText);

    fpsText = new PIXI.Text('FPS: 0', {fontSize:32, fill:0x66ff33});
    fpsText.position.set(1650, 10);
    app.stage.addChild(fpsText);

    Rcommand = new PIXI.Text('R:reload game', {fontSize:24, fill:0x000000});
    Rcommand.position.set(10, 90);
    app.stage.addChild(Rcommand);

    SnStartcommand = new PIXI.Text('S or Space:start the game', {fontSize:24, fill:0x000000});
    SnStartcommand.position.set(10, 120);
    app.stage.addChild(SnStartcommand);

    /*rgb = [0xffffff, 0x0d0d0d];
    n = prompt("0:white, 1:black");
    */
    function spawnTarget() {

    target = new PIXI.Graphics();
    target.beginFill(0xffffff); //then black:0x0d0d0d
    target.drawCircle(0, 0, targetSize);
    target.endFill();
    target.x = Math.random() * (app.renderer.width - 2 * targetSize) + targetSize;
    target.y = Math.random() * (app.renderer.height - 2 * targetSize) + targetSize;
    target.interactive = true;
    target.buttonMode = true;
    target.on("mouseover", onPointAssoc);
    app.stage.addChild(target);
    }
    spawnTarget();

    function onPointAssoc() {
    score += 1;
    scoreText.text = "Score:" + score;
    target.x = Math.random() * (app.renderer.width - 20) + 1;
    target.y = Math.random() * (app.renderer.height - 20) + 1;
    sound = new Audio();
    sound.src = "8Bit2.ogg";
    sound.play();
    increaseSeconds();
    }

    function makeCursor() { 
    cursor = new PIXI.Graphics();
    cursor.beginFill(0x0d0d0d); //then black:0x0d0d0d
    cursor.drawCircle(0, 0, cursorSize);
    cursor.endFill();
    cursor.x = Math.random() * (app.renderer.width - 2 * cursorSize) + cursorSize;
    cursor.y = Math.random() * (app.renderer.height - 2 * cursorSize) + cursorSize;
    cursor.interactive = true;
    cursor.buttonMode = true;
    app.stage.addChild(cursor);
    }
    makeCursor();
    
    //cursor
    document.addEventListener("mousemove", followPointer);
    function followPointer(e) {
        let x2 = e.clientX;
        let y2 = e.clientY;
        cursor.x = x2;
        cursor.y = y2;
    }

    //collision
    function collision() {

        if(target.x >= 1600 && target.y >= 1200) {
            target.x = 600;
            target.y = 600;
        }
    }
    collision();

    /*this function need to increase seconds number, when 
    the pointer's near to target*/
    function increaseSeconds(Decay) {
        Decay = s++;
        timerText.text = "Seconds:" + Decay;
    }
   
    //keycommands
    document.addEventListener("keydown", (event) => {

    if(event.key == 'r') {
        window.location.reload();
    }

    if(event.key == ' ' || event.key == "s") {
    //timer   
    let timer = setInterval(function() {   
        timerText.text = "Seconds:" + s; 
        s--;    
        if(s == -1) {
          
           timerText.text = "GameOver";
           clearInterval(timer);
           target.interactive = false;
           }
    }, 250);
    }
    })

    //frame rate
    function updateFPS() {
        const currentFrameTime = performance.now();
        const delta = currentFrameTime - lastFrameTime;
        const fps = (1000 / delta).toFixed(2);
        fpsText.text = 'FPS: ' + fps;
        lastFrameTime = currentFrameTime;
    }

    app.ticker.add(() => {
        updateFPS(); // Update the FPS every frame
    });

})();

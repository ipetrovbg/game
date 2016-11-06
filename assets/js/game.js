; (function () {
   var timer;
    function prepeareCanvas(callback) {
        var canvas = document.getElementById("canvas");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        callback(canvas);
    }
    //Friend Image
    var fReady = false;
    var fImage = new Image();

    fImage.onload = function () {
        fReady = true;
    }

    fImage.src = "assets/images/hero.png";
    var then = 0;
    //Game objects
    var hero = {
        speed: 500,
        x: getRandomInt(0, window.innerWidth - 100),
        y: getRandomInt(0, window.innerHeight - 100)
    };
    function getRandomInt(min, max) {
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        // console.log(num);
        return num;
    }
    var keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
        e.preventDefault();
    }, false);
    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
        e.preventDefault();
    }, false);


    function update(modifier) {

        if (38 in keysDown) {
            if (hero.y > -10) {
                hero.y -= hero.speed * modifier;
            }

        }
        if (40 in keysDown) {
            if (hero.y < window.innerHeight - 87) {
                hero.y += hero.speed * modifier;
            }
        }
        if (37 in keysDown) {
            if (hero.x > -20) {
                hero.x -= hero.speed * modifier;
            }

        }
        if (39 in keysDown) {
            if (hero.x < window.innerWidth - 80) {
                hero.x += hero.speed * modifier;
            }

        }
    }

    function render(c) {
        c.clearRect(0, 0, window.innerWidth, window.inner);
        if (fReady == true) {
            c.drawImage(fImage, hero.x, hero.y, 100, 100);
        }
    }

    function onResize() {

        timer && clearTimeout(timer);
        timer = setTimeout(actualResize, 200);

    }
    function actualResize() {
        if(window.innerWidth - 100 <= hero.x){
            hero.x = window.innerWidth - 80;
        }
        if(window.innerHeight - 100 <= hero.y){
            hero.y = window.innerHeight - 80;
        }
        window.cancelAnimationFrame(requestAnimationFrame);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setImage();
    }

    window.addEventListener("resize", onResize);

    function readyCanvas(c) {
        var ctx = c.getContext("2d");
        var now = Date.now();
        var delta = now - then;
        var canvas2 = document.getElementById('grid');
        canvas2.width = window.innerWidth;
        canvas2.height = window.innerHeight;
        drawGrid(canvas2);

        update(delta / 1000);
        render(ctx);

        then = now;

        requestAnimationFrame(setImage);
    }

    function setImage() {
        prepeareCanvas(readyCanvas);
    }
    var w = window;
     requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

    function start() {

        then = Date.now();
        setImage();
    }
    function drawGrid(cnv) {

        var gridOptions = {
            minorLines: {
                separation: 70,
                color: '#dadada'
            },
        };

        drawGridLines(cnv, gridOptions.minorLines);

        return;
    }

    function drawGridLines(cnv, lineOptions) {

        var iWidth = cnv.width;
        var iHeight = cnv.height;

        var ctx = cnv.getContext('2d');

        ctx.strokeStyle = lineOptions.color;
        ctx.strokeWidth = 1;

        ctx.beginPath();

        var iCount = null;
        var i = null;
        var x = null;
        var y = null;

        iCount = Math.floor(iWidth / lineOptions.separation);

        for (i = 1; i <= iCount; i++) {
            x = (i * lineOptions.separation);
            ctx.moveTo(x, 0);
            ctx.lineTo(x, iHeight);
            ctx.stroke();
        }

        iCount = Math.floor(iHeight / lineOptions.separation);

        for (i = 1; i <= iCount; i++) {
            y = (i * lineOptions.separation);
            ctx.moveTo(0, y);
            ctx.lineTo(iWidth, y);
            ctx.stroke();
        }

        ctx.closePath();

        return;
    }

    start();
} ());
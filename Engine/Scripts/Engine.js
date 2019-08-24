import PlayerGO from '../../Assets/Scripts/GameObjects/PlayerGO.js';
import InputHandler from './Systems/InputHandler.js';

var Indexes = {
    GameUpdateFunctions: [],
    DrawFunctions: [],
    Colliders: []
};

var GAME_STARTED = true;

(function() {

    const canvas = document.getElementById("GameScreen");
    const ctx = canvas.getContext("2d");

    const GAMESCREEN = {
        W: canvas.width,
        H: canvas.height
    };


    const inputHandler = new InputHandler();

    const GameObjects = [];
    GameObjects.push(new PlayerGO(Indexes, inputHandler));



    let lastTime = 0;
    function gameLoop(timestamp) {
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        if(!timestamp || !lastTime || !GAME_STARTED) return;

        ctx.clearRect(0, 0, GAMESCREEN.W, GAMESCREEN.H);

        Indexes.GameUpdateFunctions.forEach(obj => {
            obj.Update(deltaTime);
        });

        Indexes.DrawFunctions.forEach(obj => {
            obj.Draw(ctx);
        });

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
})();
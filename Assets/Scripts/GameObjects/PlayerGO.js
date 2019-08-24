import Transform from '../../../Engine/Scripts/Systems/Transform.js';
import Renderer from '../../../Engine/Scripts/Systems/Renderer.js';
import Movement from '../../../Engine/Scripts/Systems/Movement.js';
import BoxCollider from '../../../Engine/Scripts/Systems/Colliders/BoxCollider.js';

export default class GameObject {
    constructor(Indexes, InputHandler) {
        this.TransformSystem = new Transform();
        this.RendererSystem = new Renderer(Indexes, this.TransformSystem);
        this.BoxCollider = new BoxCollider({x: 0.5, y: 0.5}, {w: 100, h: 100}, this.TransformSystem, Indexes);
        
        const Speed = 0.5;
        this.MovementSystem = new Movement(Speed, Indexes, InputHandler, this.TransformSystem, [this.BoxCollider]);

        Indexes.GameUpdateFunctions.push(this);
    }

    Update(dt) {
        
    }
}
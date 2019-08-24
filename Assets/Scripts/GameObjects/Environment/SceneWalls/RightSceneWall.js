import Transform from '../../../../../Engine/Scripts/Systems/Transform.js';
import Renderer from '../../../../../Engine/Scripts/Systems/Renderer.js';
import BoxCollider from '../../../../../Engine/Scripts/Systems/Colliders/BoxCollider.js';

export default class GameObject {
    constructor(Indexes, Position) {
        this.TransformSystem = new Transform(Position, undefined, {w: 100, h: 1000});
        this.RendererSystem = new Renderer(Indexes, this.TransformSystem);
        this.BoxCollider = new BoxCollider({x: 0.5, y: 0.5}, {w: 100, h: 1000}, this.TransformSystem, Indexes);

        Indexes.GameUpdateFunctions.push(this);
    }

    Update(dt) {
        
    }
}
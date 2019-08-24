import Transform from '../Systems/Transform.js';

export default class Movement {
    constructor(Speed, Indexes, InputHandler, TransformSystem, Colliders) {
        this.TransformSystem = TransformSystem;
        this.InputHandler = InputHandler;
        this.Colliders = Colliders;
        this.Indexes = Indexes;

        Indexes.GameUpdateFunctions.push(this);

        this.Speed = Speed;
    }

    Update(dt) {
        const shift = this.calculateShift(dt);
        
        if(shift.x != 0 || shift.y != 0)
        {
            const newPos = this.TransformSystem.getPosition;
            newPos.x += shift.x;
            newPos.y += shift.y;

            const criticalPoints = this.getCriticalPointsFromColliders(newPos);
            if (!this.checkColliderPointIntersection(criticalPoints))
            {
                this.TransformSystem.setPosition = newPos;
            }
        }
    }

    checkColliderPointIntersection(criticalPoints) {
        let intersected = false;

        for(let collider of this.Indexes.Colliders) {
            let mine = false;

            for(let myCollider of this.Colliders) {
                if(collider == myCollider) {
                    mine = true;
                    break;
                }
            }

            if(!mine) {
                for(let point of criticalPoints) {
                    if(collider.doesPointIntersectCollider(point)) {
                        intersected = true;
                        break;
                    }
                }
                
                if(intersected) break;
            }
        }

        return intersected;
    }

    getCriticalPointsFromColliders(newPos, newRot, newSize) {
        const transform = new Transform(newPos, newRot, newSize);
        let criticalPoints = [];

        this.Colliders.forEach(function(collider) {
            criticalPoints = criticalPoints.concat(collider.AfterMoveCriticalPoints(transform));
        });

        return criticalPoints;
    }

    calculateShift(dt) {
        const shift = {x: 0, y: 0};
        
        if(this.InputHandler.keyDown('d'))
        {
            shift.x += dt * this.Speed;
        }
        if(this.InputHandler.keyDown('a'))
        {
            shift.x -= dt * this.Speed;
        }
        if(this.InputHandler.keyDown('w'))
        {
            shift.y -= dt * this.Speed;
        }
        if(this.InputHandler.keyDown('s'))
        {
            shift.y += dt * this.Speed;
        }

        if(shift.x != 0 && shift.y != 0)
        {
            shift.x /= Math.sqrt(2);
            shift.y /= Math.sqrt(2);
        }

        return shift;
    }
}
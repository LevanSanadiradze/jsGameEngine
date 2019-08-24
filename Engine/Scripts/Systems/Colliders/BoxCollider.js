export default class BoxCollider {
    constructor(pivot, size, Transform, Indexes) {
        this.pivot = pivot;
        this.size = size;

        this.Transform = Transform;

        Indexes.Colliders.push(this);

        this.recalculateBounds = true;
        this.boundsCache;
    }

    calculateBounds(Transform) {
        if(!this.recalculateBounds && Transform == this.Transform) {
            return this.boundsCache;
        }

        const pos = Transform.getPosition;
        const rot = Transform.getRotation;
        const size = Transform.getSize;

        const rotrad = rot * Math.PI / 180.0;

        let lx = pos.x - this.pivot.x * size.w;
        let by = pos.y - this.pivot.y * size.h;
        lx = lx * Math.cos(rotrad) - by * Math.sin(rotrad);
        by = lx * Math.sin(rotrad) - by * Math.cos(rotrad);

        let rx = pos.x + this.pivot.x * size.w;
        let uy = pos.y + this.pivot.y * size.h;
        rx = rx * Math.cos(rotrad) - uy * Math.sin(rotrad);
        uy = rx * Math.sin(rotrad) - uy * Math.cos(rotrad);

        if(Transform == this.Transform) {
            this.boundsCache = {lx: lx, by: by, rx: rx, uy: uy};
        }

        return {lx: lx, by: by, rx: rx, uy: uy};
    }

    doesPointIntersectCollider(point) {
        bounds = this.calculateBounds(this.Transform);

        return (point.x >= bounds.lx && point.x <= bounds.rx) && (point.y >= bounds.by && point.y <= bounds.uy);
    }

    AfterMoveCriticalPoints(futureTransform) {
        const bounds = this.calculateBounds(futureTransform);
        const points = [];

        for(let y = bounds.by; y <= bounds.uy; y++)
        {
            for(let x = bounds.lx; x <= bounds.rx; x++)
            {
                points.push({x: x, y: y});
            }
        }

        return points;
    }
}
export default class Renderer {
    constructor(Indexes, TransformSystem) {
        Indexes.DrawFunctions.push(this);
        this.TransformSystem = TransformSystem;
    }

    Draw(ctx) {
        const pos = this.TransformSystem.getPosition;
        const size = this.TransformSystem.getSize;
        ctx.fillRect(
            pos.x,
            pos.y,
            size.w,
            size.h
        );
    }
}
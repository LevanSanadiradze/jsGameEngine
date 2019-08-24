export default class Transform {
    constructor(position, rotation, size, pivot) {

        if(typeof position != 'undefined') {
            this.x = position.x;
            this.y = position.y;
        }
        else {
            this.x = 0;
            this.y = 0;
        }

        if(typeof rotation != 'undefined') {
            this.rotz = rotation.z;
        }
        else {
            this.rotz = 0;
        }

        if(typeof size != 'undefined') {
            this.w = size.w;
            this.h = size.h;
        }
        else {
            this.w = 100;
            this.h = 100;
        }
    }


    get getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    get getRotation() {
        return { 
            z: this.rotz
        };
    }

    get getSize() {
        return {
            w: this.w,
            h: this.h
        };
    }


    set setPosition(pos) {
        this.x = pos.x;
        this.y = pos.y;
    }

    set setRotation(rot) {
        this.rotz = rot.z;
    }

    set setSize(size) {
        this.w = size.w;
        this.h = size.h;
    }
}
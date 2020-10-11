export class Student{
    nombre:string;
    image:string;
    codigo:number;
    cedula:number;
    edad:number;
    direccion:string;
    telefono:number;
    constructor(nombre:string, image:string, codigo:number, cedula:number, 
                edad:number, direccion:string, telefono:number){
        this.nombre = nombre;
        this.image = image;
        this.codigo = codigo;
        this.cedula = cedula;
        this.edad = edad;
        this.direccion = direccion;
        this.telefono = telefono;
    }
}
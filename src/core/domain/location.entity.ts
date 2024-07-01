export class Location {
    constructor(
        public cep: string,
        public logradouro: string,
        public complemento: string,
        public unidade: string,
        public bairro: string,
        public localidade: string,
        public uf: string,
        public ibge: string,
        public gia: string,
        public ddd: string,
        public siafi: string,
    ) { }
}

export class UserLocation {
    constructor(
        public city: string,
        public ddd: string,
        public state: string,
    ) { }
}

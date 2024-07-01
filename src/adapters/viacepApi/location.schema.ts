export class LocationSchema {
    constructor(
        public cep: string,
        public logradouro: string,
        public complemento: string,
        public unidade: string,
        public localidade: string,
        public uf: string,
        public ibge: string,
        public gia: string,
        public ddd: string,
        public siafi: string,
    ) { }
}


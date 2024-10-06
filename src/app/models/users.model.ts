import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class User {

    constructor(

        public id: string,
        public usuario: string,
        public change_password: boolean,
        public menu: Array<any>,
        public password?: string,
        public permission?: Array<any>,

    ) { }

}


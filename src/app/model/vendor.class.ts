export class Vendor {

    id: number;
    code : String;
	name: String;
	address: String;
	city: String;
	state: String;
	zip: String;
	phoneNumber: string;
    email: string;
    

    constructor(id: number =0, code: string="", name: string="", address: string="", city: string="", state: string="", zip: string="",
        phoneNumber: string="", email: string="") {
    this.id = id;
    this.code = code;
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.phoneNumber = phoneNumber;
    this.email = email;
        }
    }
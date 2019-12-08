export class User {

	id: number;
	userName: String;
	password: String;
	firstName: String;
	lastName: String;
	phoneNumber: String;
	email: String;
	Reviewer: boolean;
	Admin: boolean;


	constructor(id: number = 0, userName: string = "", password: string = "", firstName: string = "",
		lastName: string = "", phoneNumber: string = "", email: string = "", Reviewer: boolean = false, Admin: boolean = false) {


		this.id = id;
		this.userName = userName;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.Reviewer = Reviewer;
		this.Admin = Admin;

	}

}

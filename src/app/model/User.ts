export class User{
    id!: number ;
    userId!: string ;
    firstName: string ;
    lastName: string ;
    username: string ;
    password!: string ;
    email: string ;
    profileImageUrl!: string ;
    lastLoginDate!: Date ;
    lastLoginDateDisplay!: Date ;
    joinDate!: Date ;
    role!: string ;
    authorities: Array<string> ;
    isActive: boolean ;
    isNotLocked: boolean ;

    constructor(){
        this.firstName = ''
        this.lastName = ''
        this.username = ''
        this.email = ''
        this.authorities = []
        this.isActive = false
        this.isNotLocked = false
    }
}
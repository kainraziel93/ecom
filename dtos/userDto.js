class UserDto{

    constructor(id,name,email,mobile,role){
        this.id = id;
        this.name = name;
        this.email=email;
        this.mobile = mobile;
        this.role = role;
    }

    static mapFromJson(jsonResult){
        return new UserDto(jsonResult.id,jsonResult.name,jsonResult.email,jsonResult.mobile,jsonResult.role)
    }
}
module.exports = UserDto;
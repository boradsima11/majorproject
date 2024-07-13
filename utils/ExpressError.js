class ExpressError extends Error{
    constructor(statuscode,message){
        super(); //call error class mean parent
        this.statuscode=statuscode;
        this.message=message;
    }
}

module.exports=ExpressError;

//ERROR is class
//ExpressError class inherti error class 
import User from "../models/user.model"


export const getUserByEmail = async (email) => {
    return await User.findOne({email, isDeleted: false});
};
export const createUser = async ({email,name,age,password,city,zipCode}) => {
    return await User.create({email,name,age,password,city,zipCode});
}
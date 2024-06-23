import User from "../models/user.model"


export const getUserByEmail = async (email) => {
    return await User.findOne({email, isDeleted: false});
};
export const createUser = async ({email,name,age,password,city,zipCode}) => {
    return await User.create({email,name,age,password,city,zipCode});
}
export const findUserById = async (id) => {
    return await User.findById(id).where({isDeleted:false});
}
export const getUsers = async (page) => {
    return await User.find({isDeleted:false}).skip((page-1)*10).limit(10).select("-password -token -isDeleted -createdAt -updatedAt");
}
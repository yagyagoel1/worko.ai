import User from "../models/user.model"


export const getUserByEmail = async (email) => {
    return await User.findOne({email, isDeleted: false});
};

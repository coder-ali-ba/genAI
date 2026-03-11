import mongoose from "mongoose";

const blckListTokenSchema = new mongoose.Schema({
    token : {
     type: String,
     required : [true , "Token is required to add in balcklist"]
    }
  } , 
  {timestamps : true}
);

const tokenBlacklistModel = mongoose.model("blacklistTokens" , blckListTokenSchema);

export default tokenBlacklistModel
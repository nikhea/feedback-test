import mongoose from "mongoose";

const valideMongooseObjectId = (id: string) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return {
      message: "Invalid or missing user ID",
      success: false,
      statusCode: 400,
    };
  }
};

export { valideMongooseObjectId };

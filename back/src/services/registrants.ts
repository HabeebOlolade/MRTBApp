import dotenv from "dotenv";

import {
  AlreadyExist,
  InternalServerError,
  NotFoundError,
} from "../helpers/apiError";
import Registrant, { RegistrantDocument } from "../models/registrant";

dotenv.config();
const SMTP_EMAIL = process.env.SMTP_EMAIL as string;

// Create a new Registrant with validation
export const createRegistrantService = async (
  newRegistrant: RegistrantDocument
): Promise<RegistrantDocument> => {
  try {
    const existingRegistrant = await Registrant.findOne({
      email: newRegistrant.email,
    });
    if (existingRegistrant) {
      throw new AlreadyExist(
        `Registrant with ${newRegistrant.email} already exists`
      );
    }
    return await newRegistrant.save();
  } catch (error) {
    throw error;
  }
};

// Find a Registrant by email
export const findRegistrantByEmailService = async (
  email: string
): Promise<RegistrantDocument> => {
  try {
    const foundRegistrant = await Registrant.findOne({
      email,
      isBanned: false,
    });
    if (!foundRegistrant) {
      throw new NotFoundError(`Registrant with ${email} not found`);
    }
    return foundRegistrant;
  } catch (error) {
    throw error;
  }
};

// find a Registrant by token
export const findRegistrantByTokenService = async (
  token: string,
  field: string, // field to search (e.g., 'emailConfirmationToken' or 'resetToken')
  errorMessage: string // error message for the NotFoundError
) => {
  try {
    const Registrant = await Registrant.findOne({ [field]: token }).exec();
    if (!Registrant) {
      throw new NotFoundError(errorMessage);
    }
    return Registrant;
  } catch (error) {
    throw error;
  }
};

// get a Registrant by ID (excluding password)
export const getRegistrantByIdService = async (
  RegistrantId: string
): Promise<RegistrantDocument> => {
  try {
    const RegistrantById = await Registrant.findById(RegistrantId).select(
      "-password"
    );
    if (!RegistrantById) {
      throw new NotFoundError(`No Registrant found with ID ${RegistrantId}`);
    }
    return RegistrantById;
  } catch (error) {
    throw error;
  }
};

// get a list of all Registrants
export const getRegistrantListService = async (): Promise<
  RegistrantDocument[]
> => {
  try {
    const RegistrantList = await Registrant.find();
    return RegistrantList;
  } catch (error) {
    throw error;
  }
};

// update Registrant information by ID
export const updateRegistrantByIdService = async (
  RegistrantId: string,
  updateRegistrantInformation: Partial<RegistrantDocument>
): Promise<RegistrantDocument> => {
  try {
    const RegistrantById = await Registrant.findByIdAndUpdate(
      RegistrantId,
      updateRegistrantInformation,
      {
        new: true,
      }
    );
    if (!RegistrantById) {
      throw new NotFoundError(`No Registrant found with ID ${RegistrantId}`);
    }
    return RegistrantById;
  } catch (error) {
    throw error;
  }
};

// save media upload (Registrant avatar/banner)
export const uploadMediaService = async (
  RegistrantId: string,
  mediaType: string,
  mediaData: string | undefined
): Promise<RegistrantDocument> => {
  try {
    const Registrant = await Registrant.findById(RegistrantId);
    if (!Registrant) {
      throw new NotFoundError(`Registrant with ID ${RegistrantId} not found`);
    }

    if (mediaData !== undefined) {
      if (mediaType === "avatar" || mediaType === "banner") {
        Registrant[mediaType] = mediaData;
      } else {
        throw new Error(`Invalid mediaType: ${mediaType}`);
      }
    }

    await Registrant.save();
    return Registrant;
  } catch (error) {
    throw error;
  }
};

// update Registrant role (admin/Registrant)
export const updateRoleService = async (
  RegistrantId: string
): Promise<RegistrantDocument> => {
  try {
    const foundRegistrant = await Registrant.findOne({ _id: RegistrantId });
    if (!foundRegistrant) {
      throw new NotFoundError(`Registrant not found with ID ${RegistrantId}`);
    }

    if (foundRegistrant.role === "admin") {
      foundRegistrant.role = "Registrant";
    } else {
      if (foundRegistrant.isBanned === true) {
        foundRegistrant.role = "Registrant";
      } else {
        foundRegistrant.role = "admin";
      }
    }

    const updatedRegistrant = await updateRegistrantByIdService(
      RegistrantId,
      foundRegistrant
    );
    return updatedRegistrant;
  } catch (error) {
    throw error;
  }
};

// update Registrant restriction (ban/unban)
export const updateRestrictionService = async (
  RegistrantId: string
): Promise<RegistrantDocument> => {
  try {
    const foundRegistrant = await Registrant.findOne({ _id: RegistrantId });
    if (!foundRegistrant) {
      throw new NotFoundError(`Registrant not found with ID ${RegistrantId}`);
    }

    foundRegistrant.isBanned = !foundRegistrant.isBanned;

    const updatedRegistrant = await updateRegistrantByIdService(
      RegistrantId,
      foundRegistrant
    );
    return updatedRegistrant;
  } catch (error) {
    throw error;
  }
};

// delete a Registrant by ID
export const deleteRegistrantByIdService = async (
  RegistrantId: string
): Promise<RegistrantDocument> => {
  try {
    const RegistrantById = await Registrant.findByIdAndDelete(RegistrantId);
    if (!RegistrantById) {
      throw new NotFoundError(`No Registrant found with ID ${RegistrantId}`);
    }
    return RegistrantById;
  } catch (error) {
    throw error;
  }
};

// find or create Registrant based on authentication provider
export const findOrCreateRegistrantService = async (
  provider: "twitter" | "github" | "google",
  payload: Partial<RegistrantDocument>
): Promise<RegistrantDocument> => {
  try {
    const query = { [`${provider}Id`]: payload[`${provider}Id`] };
    const Registrant = await Registrant.findOne(query);

    if (Registrant) {
      return Registrant; // Registrant already exists
    } else {
      const newRegistrant = new Registrant({
        [`${provider}Id`]: payload[`${provider}Id`],
        email: payload.email,
        RegistrantName: payload.RegistrantName,
        firstName: payload.firstName,
        lastName: payload.lastName,
        avatar: payload.avatar,
      });

      const savedRegistrant = await newRegistrant.save();
      return savedRegistrant; // new Registrant created
    }
  } catch (error) {
    console.error("Error creating account:", error);
    throw new InternalServerError(
      "An error occurred while creating the account."
    );
  }
};

// send a confirmation email with a confirmation token

import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";


import {
  createRegistrantService,
  deleteRegistrantByIdService,
  findRegistrantByEmailService,
  getRegistrantByIdService,
  getRegistrantListService,
  sendConfirmEmailService,
  updateRestrictionService,
  updateRoleService,
  updateRegistrantByIdService,
  uploadMediaService,
} from "../services/registrants";
import Registrant, { RegistrantDocument } from "../models/registrant";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

declare module "express-serve-static-core" {
  interface Request {
    file: MulterFile;
  }
}

dotenv.config();

// generate an email confirmation token with a 1-hour expiration
const generateConfirmEmailToken = () => {
  const emailConfirmationToken = uuidv4();
  const confirmEmailTokenExpiration = new Date();
  confirmEmailTokenExpiration.setHours(
    confirmEmailTokenExpiration.getHours() + 1
  ); // 1 hour expiration

  return { emailConfirmationToken, confirmEmailTokenExpiration };
};

//post: Create a new Registrant
export const createRegistrantController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName, RegistrantName, avatar } =
    req.body;

  try {
    // check if the email already exists
    let existingRegistrant: RegistrantDocument | null;
    try {
      existingRegistrant = await findRegistrantByEmailService(
        email.toLowerCase()
      );
    } catch (error) {
      // check if NotFoundError equals null then proceed with Registrant creation
      if (error instanceof NotFoundError) {
        existingRegistrant = null;
      } else {
        throw error;
      }
    }

    if (existingRegistrant) {
      if (
        existingRegistrant.googleId ||
        existingRegistrant.twitterId ||
        existingRegistrant.githubId
      ) {
        // Registrant signed in with at least one of Google, Twitter, or GitHub using this email, allow email/password signup
        if (!existingRegistrant.password) {
          // check if password doesn't already exist in db
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          existingRegistrant.password = hashedPassword;
        } else {
          // else if Registrant already registered with this email, reject signup
          res.status(409).json({ message: "Email already registered" });
        }
        // update other Registrant information
        existingRegistrant.firstName = firstName;
        existingRegistrant.lastName = lastName;
        existingRegistrant.RegistrantName = RegistrantName;
        existingRegistrant.avatar = avatar;

        await existingRegistrant.save();

        res.status(200).json(existingRegistrant);
      } else {
        // another Registrant already registered with this email, reject signup
        res.status(409).json({ message: "Email already registered" });
      }
    } else {
      // email doesn't exist, create a new Registrant as usual
      // can add validation logic to check fields are not empty
      if (password !== "") {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const RegistrantInformation = new Registrant({
          email: email.toLowerCase(),
          password: hashedPassword,
          firstName,
          lastName,
          RegistrantName,
          avatar,

          // unique reset emailConfirmationToken saved to database
          emailConfirmationToken:
            generateConfirmEmailToken().emailConfirmationToken,
          confirmEmailTokenExpiration:
            generateConfirmEmailToken().confirmEmailTokenExpiration,
        });

        const newRegistrant = await createRegistrantService(
          RegistrantInformation
        );

        // send an email to the Registrant containing the reset emailConfirmationToken link
        await sendConfirmEmailService(
          newRegistrant.email,
          newRegistrant.emailConfirmationToken!
        );

        res
          .status(201)
          .json({ message: "Confirmation email sent", newRegistrant });
      } else {
        res.status(500).send("Password required");
      }
    }
  } catch (error) {
    next(error);
  }
};

//get RegistrantByID
export const getRegistrantByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const RegistrantId = req.params.id;
    const RegistrantById = await getRegistrantByIdService(RegistrantId);

    res.status(200).json(RegistrantById);
  } catch (error) {
    next(error);
  }
};

//get: get all Registrants
export const getRegistrantListController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const RegistrantById = await getRegistrantListService();

    res.status(200).json(RegistrantById);
  } catch (error) {
    next(error);
  }
};

//put: update Registrantinfo
export const updateRegistrantInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const RegistrantId = req.params.id;

    // object to store the updated fields
    const updatedInformation: { [key: string]: any } = {};

    // fields that can be updated
    const allowedFields = [
      "firstName",
      "lastName",
      "RegistrantName",
      "headline",
      "bio",
      "email",
      "socialLinks",
    ];

    // iterate through allowed fields and check if they exist in the request body
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updatedInformation[field] = req.body[field];
      }
    });

    // check if any fields were updated
    if (Object.keys(updatedInformation).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const updatedRegistrant = await updateRegistrantByIdService(
      RegistrantId,
      updatedInformation
    );

    return res
      .status(201)
      .json({ message: "Profile updated successfully", updatedRegistrant });
  } catch (error) {
    next(error);
  }
};

// post: Registrant upload avatar
export const uploadAvatarController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const RegistrantId = req.params.id;
    const avatarData = req.file?.path;

    const Registrant = await uploadMediaService(
      RegistrantId,
      "avatar",
      avatarData
    );

    res.status(200).json({ Registrant });
  } catch (error) {
    next(error);
  }
};

// post: Registrant upload banner
export const uploadBannerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registrantId = req.params.id;
    const bannerData = req.file?.path;

    const Registrant = await uploadMediaService(
      registrantId,
      "banner",
      bannerData
    );

    res.status(200).json({ Registrant });
  } catch (error) {
    next(error);
  }
};

// put: update the role
export const updateRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const RegistrantId = req.params.RegistrantId;

    const updatedRegistrant = await updateRoleService(RegistrantId);

    res.status(201).json(updatedRegistrant);
  } catch (error) {
    next(error);
  }
};

// put: ban Registrant
export const updateRestrictionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const RegistrantId = req.params.RegistrantId;

    const updatedRegistrant = await updateRestrictionService(RegistrantId);

    res.status(201).json(updatedRegistrant);
  } catch (error) {
    next(error);
  }
};
//delete: delete a Registrant
export const deleteRegistrantByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const RegistrantById = req.params.id;
    const RegistrantList = await deleteRegistrantByIdService(RegistrantById);

    res.status(403).send();
  } catch (error) {
    next(error);
  }
};

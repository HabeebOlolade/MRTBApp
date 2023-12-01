import { Router } from "express";

import {
  createRegistrantController,
  deleteRegistrantByIdController,
  getRegistrantByIdController,
  getRegistrantListController,
  updateRegistrantInfoController,
} from "../controllers/registrantControllers";

const router = Router();

//get: register Registrant
router.post("/register", createRegistrantController);

//get: get RegistrantbyID
router.get("/:id", getRegistrantByIdController);

//get:  get the list of Registrants
router.get(
  "/",
  // adminCheck, // lets think of what to do here so Registrants can search other Registrants
  getRegistrantListController
);

//put: update Registrant info
router.put("/:id/update", updateRegistrantInfoController);

//delete: delete a Registrant
router.delete("/:id", deleteRegistrantByIdController);

// post: Registrant uploads avatar
// router.post(
//   "/:id/upload-avatar",
//   upload.single("avatar"),
//   passport.authenticate("jwt", { session: false }),
//   uploadAvatarController
// );

// post: Registrant uploads banner
// router.post(
//   "/:id/upload-banner",
//   upload.single("banner"),
//   passport.authenticate("jwt", { session: false }),
//   uploadBannerController
// );

//put: update Registrant role (admin/Registrant)
// router.put(
//   "/:RegistrantId/update-role",
//   passport.authenticate("jwt", { session: false }),
//   adminCheck,
//   updateRoleController
// );

//put: update Registrant restrictions (ban/unban Registrant)
// router.put(
//   "/:RegistrantId/update-restriction",
//   passport.authenticate("jwt", { session: false }),
//   adminCheck,
//   updateRestrictionController
// );

export default router;

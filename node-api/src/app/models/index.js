import { PublicationChangesModel } from "./publicationChange.js";
import { ConversationMessageModel } from "./conversationMessage.js";
import { ProvinceModel } from "./province.js";
import { PublicationModel } from "./publication.js";
import { PublicationStateModel } from "./publicationState.js";
import { LocalityModel } from "./locality.js";
import { UserModel } from "./user.js";
import { ConversationThreadModel } from "./conversationThread.js";
import { AgencyModel } from "./agency.js";
import { DepartmentModel } from "./department.js";
import { UserSessionModel } from "./userSession.js";
import { EmailModel } from "./email.js";
import {PublicationDetailsModel} from "./publicationDetails.js";

// RELATIONSHIPS
// They are here to avoid circular references

// An agency can be managed by different users
AgencyModel.representatives = AgencyModel.hasMany(UserModel, {
  foreignKey: "agency_id",
});

AgencyModel.locality = AgencyModel.belongsTo(LocalityModel, {
  foreignKey: "locality_id",
});

// A message is emitted by a user
ConversationMessageModel.user = ConversationMessageModel.belongsTo(UserModel, {
  foreignKey: "from_id",
});

// A conversation has messages
ConversationThreadModel.messages = ConversationThreadModel.hasMany(
  ConversationMessageModel,
  {
    foreignKey: "comment_thread_id",
    as: "messages",
    onDelete: "CASCADE",
  }
);
// A conversation has associated participants
ConversationThreadModel.participant_1 = ConversationThreadModel.belongsTo(
  UserModel,
  {
    foreignKey: "participant1_id",
  }
);
ConversationThreadModel.participant_2 = ConversationThreadModel.belongsTo(
  UserModel,
  {
    foreignKey: "participant2_id",
  }
);

// A conversation has an associated publication
ConversationThreadModel.publication = ConversationThreadModel.belongsTo(
  PublicationModel,
  {
    foreignKey: "publication_id",
    onDelete: "CASCADE",
  }
);

// A locality has a department
LocalityModel.department = LocalityModel.belongsTo(DepartmentModel, {
  foreignKey: "department_id",
});

// A department has a province
DepartmentModel.province = DepartmentModel.belongsTo(ProvinceModel, {
  foreignKey: "province_id",
});

// A department can have multiple localities
DepartmentModel.hasMany(LocalityModel, { foreignKey: "department_id" });

// A province can have multiple departments
ProvinceModel.hasMany(DepartmentModel, { foreignKey: "province_id" });

// A publication can have multiple conversations
PublicationModel.conversations = PublicationModel.hasMany(
  ConversationThreadModel,
  {
    onDelete: "CASCADE",
    foreignKey: "publication_id",
  }
);

// A publication must be associated to a user
PublicationModel.owner = PublicationModel.belongsTo(UserModel, {
  foreignKey: "user_id",
});

// A publication can have a locality
PublicationModel.locality = PublicationModel.belongsTo(LocalityModel, {
    foreignKey: "locality_id",
});

// A publication can be from an agency
PublicationModel.agency = PublicationModel.belongsTo(AgencyModel, {
    foreignKey: "agency_id",
});


// Establish one-to-one association between PublicationModel and PublicationDetailsModel.
PublicationModel.hasOne(PublicationDetailsModel);
PublicationDetailsModel.belongsTo(PublicationModel);


// Many publications can have many states -> Intermediate table: PublicationChangesModel
PublicationChangesModel.belongsTo(PublicationModel, {
  foreignKey: "publication_id",
});
PublicationChangesModel.belongsTo(PublicationStateModel, {
  foreignKey: "state_id",
});

// A user is from a locality
UserModel.locality = UserModel.belongsTo(LocalityModel, {
  foreignKey: "locality_id",
});

// A user has publications
UserModel.publications = UserModel.hasMany(PublicationModel, {
  onDelete: "CASCADE",
  foreignKey: "user_id",
});

export {
  UserModel,
  UserSessionModel,
  PublicationModel,
  AgencyModel,
  PublicationChangesModel,
  ConversationMessageModel,
  ProvinceModel,
  PublicationStateModel,
  LocalityModel,
  DepartmentModel,
  ConversationThreadModel,
  EmailModel,
};

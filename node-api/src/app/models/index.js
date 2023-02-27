import { PublicationHistoryModel } from "./publicationHistory.js";
import { ConversationMessageModel } from "./conversationMessage.js";
import { ProvinceModel } from "./province.js";
import { PublicationModel } from "./publication.js";
import { PublicationStateModel } from "./publicationState.js";
import { LocalityModel } from "./locality.js";
import { UserModel } from "./user.js";
import { PublicationPhotosModel } from "./publicationPhotos.js";
import { ConversationThreadModel } from "./conversationThread.js";
import { AgencyModel } from "./agency.js";
import { DepartmentModel } from "./department.js";

// Make relationships here to avoid circular refrences

AgencyModel.users = AgencyModel.hasMany(UserModel);

ConversationMessageModel.user = ConversationMessageModel.belongsTo(UserModel, {
  foreignKey: "from_id",
});

ConversationThreadModel.messages = ConversationThreadModel.hasMany(
  ConversationMessageModel,
  {
    foreignKey: "commentThread_id",
    as: "messages",
    onDelete: "CASCADE",
  }
);
ConversationThreadModel.participant1 = ConversationThreadModel.belongsTo(
  UserModel,
  {
    foreignKey: "participant1_id",
  }
);
ConversationThreadModel.participant2 = ConversationThreadModel.belongsTo(
  UserModel,
  {
    foreignKey: "participant2_id",
  }
);
ConversationThreadModel.publication = ConversationThreadModel.belongsTo(
  PublicationModel,
  {
    foreignKey: "publication_id",
    onDelete: "CASCADE",
  }
);

DepartmentModel.province = DepartmentModel.belongsTo(ProvinceModel);
DepartmentModel.hasMany(LocalityModel);

LocalityModel.department = LocalityModel.belongsTo(DepartmentModel);

ProvinceModel.hasMany(DepartmentModel);

PublicationModel.conversation = PublicationModel.hasMany(
  ConversationThreadModel,
  {
    onDelete: "CASCADE",
  }
);

PublicationModel.photos = PublicationModel.belongsTo(PublicationPhotosModel);

PublicationModel.user = PublicationModel.belongsTo(UserModel);

PublicationModel.state = PublicationModel.belongsToMany(PublicationStateModel, {
  through: PublicationHistoryModel,
  foreignKey: "publication_id",
  onDelete: "CASCADE",
});
PublicationModel.locality = PublicationModel.belongsTo(LocalityModel);

PublicationHistoryModel.publication = PublicationHistoryModel.belongsTo(
  PublicationModel,
  {
    onDelete: "CASCADE",
  }
);
PublicationHistoryModel.state = PublicationHistoryModel.belongsTo(
  PublicationStateModel
);

PublicationPhotosModel.hasOne(PublicationModel);

PublicationStateModel.publication = PublicationStateModel.belongsToMany(
  PublicationModel,
  {
    through: PublicationHistoryModel, // Intermediate table between PublicationState and Publication
    foreignKey: "publication_history_id",
    onDelete: "CASCADE",
  }
);

UserModel.provincialDepartemnt = UserModel.hasOne(DepartmentModel);
UserModel.publications = UserModel.hasMany(PublicationModel, {
  onDelete: "CASCADE",
});

UserModel.agency = UserModel.hasOne(AgencyModel);

export {
  UserModel,
  PublicationModel,
  AgencyModel,
  PublicationHistoryModel,
  ConversationMessageModel,
  ProvinceModel,
  PublicationStateModel,
  LocalityModel,
  DepartmentModel,
  PublicationPhotosModel,
  ConversationThreadModel,
};

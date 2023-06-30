import { db } from "../../config/db.js";
import { DataTypes } from "sequelize";

export const PublicationDetailsModel = db.define('VehicleDetails', {
    climatizer: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    centralLocking: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    multifunctionSteeringWheel: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    cruiseControl: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    airConditioning: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    leatherUpholstery: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    powerSteering: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    stabilityControl: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    tractionControl: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    absBrakes: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    fogLights: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    rearCamera: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isofixSystem: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    tirePressure: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    amFmRadio: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    usbPort: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    voiceCommand: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    multifunctionDisplay: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    bluetooth: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    gps: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    auxiliaryConnection: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});


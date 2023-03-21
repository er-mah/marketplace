import {insertProvincesSeeder} from "./provinces.js";
import {insertDepartmentsSeeder} from "./departments.js";
import {insertLocalitiesSeeder} from "./localities.js";
import {insertPublicationStatesSeeder} from "./publicationStates.js";

export const bulkDataInsert = async () => {
    await insertPublicationStatesSeeder();
    await insertProvincesSeeder();
    await insertDepartmentsSeeder();
    await insertLocalitiesSeeder();
}
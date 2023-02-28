import { DepartmentModel } from "../app/models/index.js";
import { db } from "../config/db.js";

const departmentsToCreate = [
  {
    id: 1,
    name: "25 DE MAYO",
    province_id: 1,
  },
  {
    id: 2,
    name: "9 DE JULIO",
    province_id: 1,
  },
  {
    id: 3,
    name: "ADOLFO ALSINA",
    province_id: 1,
  },
  {
    id: 4,
    name: "ADOLFO GONZALES CHAVES",
    province_id: 1,
  },
  {
    id: 5,
    name: "ALBERTI",
    province_id: 1,
  },
  {
    id: 6,
    name: "ALMIRANTE BROWN",
    province_id: 1,
  },
  {
    id: 7,
    name: "ARRECIFES",
    province_id: 1,
  },
  {
    id: 8,
    name: "AVELLANEDA",
    province_id: 1,
  },
  {
    id: 9,
    name: "AYACUCHO",
    province_id: 1,
  },
  {
    id: 10,
    name: "AZUL",
    province_id: 1,
  },
  {
    id: 11,
    name: "BAHÍA BLANCA",
    province_id: 1,
  },
  {
    id: 12,
    name: "BALCARCE",
    province_id: 1,
  },
  {
    id: 13,
    name: "BARADERO",
    province_id: 1,
  },
  {
    id: 14,
    name: "BENITO JUAREZ",
    province_id: 1,
  },
  {
    id: 15,
    name: "BERAZATEGUI",
    province_id: 1,
  },
  {
    id: 16,
    name: "BERISSO",
    province_id: 1,
  },
  {
    id: 17,
    name: "BOLIVAR",
    province_id: 1,
  },
  {
    id: 18,
    name: "BRAGADO",
    province_id: 1,
  },
  {
    id: 19,
    name: "BRANDSEN",
    province_id: 1,
  },
  {
    id: 20,
    name: "CAMPANA",
    province_id: 1,
  },
  {
    id: 21,
    name: "CAÑUELAS",
    province_id: 1,
  },
  {
    id: 22,
    name: "CAPITAN SARMIENTO",
    province_id: 1,
  },
  {
    id: 23,
    name: "CARLOS CASARES",
    province_id: 1,
  },
  {
    id: 24,
    name: "CARLOS TEJEDOR",
    province_id: 1,
  },
  {
    id: 25,
    name: "CARMEN DE ARECO",
    province_id: 1,
  },
  {
    id: 26,
    name: "CASTELLI",
    province_id: 1,
  },
  {
    id: 27,
    name: "CHACABUCO",
    province_id: 1,
  },
  {
    id: 28,
    name: "CHASCOMUS",
    province_id: 1,
  },
  {
    id: 29,
    name: "CHIVILCOY",
    province_id: 1,
  },
  {
    id: 30,
    name: "COLON",
    province_id: 1,
  },
  {
    id: 31,
    name: "CORONEL DE MARINA L ROSALES",
    province_id: 1,
  },
  {
    id: 32,
    name: "CORONEL DORREGO",
    province_id: 1,
  },
  {
    id: 33,
    name: "CORONEL PRINGLES",
    province_id: 1,
  },
  {
    id: 34,
    name: "CORONEL SUAREZ",
    province_id: 1,
  },
  {
    id: 35,
    name: "DAIREAUX",
    province_id: 1,
  },
  {
    id: 36,
    name: "DOLORES",
    province_id: 1,
  },
  {
    id: 37,
    name: "ENSENADA",
    province_id: 1,
  },
  {
    id: 38,
    name: "ESCOBAR",
    province_id: 1,
  },
  {
    id: 39,
    name: "ESTEBAN ECHEVERRIA",
    province_id: 1,
  },
  {
    id: 40,
    name: "EXALTACIÓN DE LA CRUZ",
    province_id: 1,
  },
  {
    id: 41,
    name: "EZEIZA",
    province_id: 1,
  },
  {
    id: 42,
    name: "FLORENCIO VARELA",
    province_id: 1,
  },
  {
    id: 43,
    name: "FLORENTINO AMEGHINO",
    province_id: 1,
  },
  {
    id: 44,
    name: "GENERAL ALVARADO",
    province_id: 1,
  },
  {
    id: 45,
    name: "GENERAL ALVEAR",
    province_id: 1,
  },
  {
    id: 46,
    name: "GENERAL ARENALES",
    province_id: 1,
  },
  {
    id: 47,
    name: "GENERAL BELGRANO",
    province_id: 1,
  },
  {
    id: 48,
    name: "GENERAL GUIDO",
    province_id: 1,
  },
  {
    id: 49,
    name: "GENERAL JUAN MADARIAGA",
    province_id: 1,
  },
  {
    id: 50,
    name: "GENERAL LA MADRID",
    province_id: 1,
  },
  {
    id: 51,
    name: "GENERAL LAS HERAS",
    province_id: 1,
  },
  {
    id: 52,
    name: "GENERAL LAVALLE",
    province_id: 1,
  },
  {
    id: 53,
    name: "GENERAL PAZ",
    province_id: 1,
  },
  {
    id: 54,
    name: "GENERAL PINTO",
    province_id: 1,
  },
  {
    id: 55,
    name: "GENERAL PUEYRREDON",
    province_id: 1,
  },
  {
    id: 56,
    name: "GENERAL RODRIGUEZ",
    province_id: 1,
  },
  {
    id: 57,
    name: "GENERAL SAN MARTIN",
    province_id: 1,
  },
  {
    id: 58,
    name: "GENERAL VIAMONTE",
    province_id: 1,
  },
  {
    id: 59,
    name: "GENERAL VILLEGAS",
    province_id: 1,
  },
  {
    id: 60,
    name: "GUAMINI",
    province_id: 1,
  },
  {
    id: 61,
    name: "HIPOLITO YRIGOYEN",
    province_id: 1,
  },
  {
    id: 62,
    name: "HURLINGHAM",
    province_id: 1,
  },
  {
    id: 63,
    name: "ITUZAINGO",
    province_id: 1,
  },
  {
    id: 64,
    name: "JOSE C PAZ",
    province_id: 1,
  },
  {
    id: 65,
    name: "JUNIN",
    province_id: 1,
  },
  {
    id: 66,
    name: "LA COSTA",
    province_id: 1,
  },
  {
    id: 67,
    name: "LA MATANZA",
    province_id: 1,
  },
  {
    id: 68,
    name: "LA PLATA",
    province_id: 1,
  },
  {
    id: 69,
    name: "LANÚS",
    province_id: 1,
  },
  {
    id: 70,
    name: "LAPRIDA",
    province_id: 1,
  },
  {
    id: 71,
    name: "LAS FLORES",
    province_id: 1,
  },
  {
    id: 72,
    name: "LEANDRO N ALEM",
    province_id: 1,
  },
  {
    id: 73,
    name: "LEZAMA",
    province_id: 1,
  },
  {
    id: 74,
    name: "LINCOLN",
    province_id: 1,
  },
  {
    id: 75,
    name: "LOBERIA",
    province_id: 1,
  },
  {
    id: 76,
    name: "LOBOS",
    province_id: 1,
  },
  {
    id: 77,
    name: "LOMAS DE ZAMORA",
    province_id: 1,
  },
  {
    id: 78,
    name: "LUJAN",
    province_id: 1,
  },
  {
    id: 79,
    name: "MAGDALENA",
    province_id: 1,
  },
  {
    id: 80,
    name: "MAIPU",
    province_id: 1,
  },
  {
    id: 81,
    name: "MALVINAS ARGENTINAS",
    province_id: 1,
  },
  {
    id: 82,
    name: "MAR CHIQUITA",
    province_id: 1,
  },
  {
    id: 83,
    name: "MARCOS PAZ",
    province_id: 1,
  },
  {
    id: 84,
    name: "MERCEDES",
    province_id: 1,
  },
  {
    id: 85,
    name: "MERLO",
    province_id: 1,
  },
  {
    id: 86,
    name: "MONTE",
    province_id: 1,
  },
  {
    id: 87,
    name: "MONTE HERMOSO",
    province_id: 1,
  },
  {
    id: 88,
    name: "MORENO",
    province_id: 1,
  },
  {
    id: 89,
    name: "MORON",
    province_id: 1,
  },
  {
    id: 90,
    name: "NAVARRO",
    province_id: 1,
  },
  {
    id: 91,
    name: "NECOCHEA",
    province_id: 1,
  },
  {
    id: 92,
    name: "OLAVARRIA",
    province_id: 1,
  },
  {
    id: 93,
    name: "PATAGONES",
    province_id: 1,
  },
  {
    id: 94,
    name: "PEHUAJO",
    province_id: 1,
  },
  {
    id: 95,
    name: "PELLEGRINI",
    province_id: 1,
  },
  {
    id: 96,
    name: "PERGAMINO",
    province_id: 1,
  },
  {
    id: 97,
    name: "PILA",
    province_id: 1,
  },
  {
    id: 98,
    name: "PILAR",
    province_id: 1,
  },
  {
    id: 99,
    name: "PINAMAR",
    province_id: 1,
  },
  {
    id: 100,
    name: "PRESIDENTE PERON",
    province_id: 1,
  },
  {
    id: 101,
    name: "PUAN",
    province_id: 1,
  },
  {
    id: 102,
    name: "PUNTA INDIO",
    province_id: 1,
  },
  {
    id: 103,
    name: "QUILMES",
    province_id: 1,
  },
  {
    id: 104,
    name: "RAMALLO",
    province_id: 1,
  },
  {
    id: 105,
    name: "RAUCH",
    province_id: 1,
  },
  {
    id: 106,
    name: "RIVADAVIA",
    province_id: 1,
  },
  {
    id: 107,
    name: "ROJAS",
    province_id: 1,
  },
  {
    id: 108,
    name: "ROQUE PEREZ",
    province_id: 1,
  },
  {
    id: 109,
    name: "SAAVEDRA",
    province_id: 1,
  },
  {
    id: 110,
    name: "SALADILLO",
    province_id: 1,
  },
  {
    id: 111,
    name: "SALLIQUELO",
    province_id: 1,
  },
  {
    id: 112,
    name: "SALTO",
    province_id: 1,
  },
  {
    id: 113,
    name: "SAN ANDRES DE GILES",
    province_id: 1,
  },
  {
    id: 114,
    name: "SAN ANTONIO DE ARECO",
    province_id: 1,
  },
  {
    id: 115,
    name: "SAN CAYETANO",
    province_id: 1,
  },
  {
    id: 116,
    name: "SAN FERNANDO",
    province_id: 1,
  },
  {
    id: 117,
    name: "SAN ISIDRO",
    province_id: 1,
  },
  {
    id: 118,
    name: "SAN MIGUEL",
    province_id: 1,
  },
  {
    id: 119,
    name: "SAN NICOLAS",
    province_id: 1,
  },
  {
    id: 120,
    name: "SAN PEDRO",
    province_id: 1,
  },
  {
    id: 121,
    name: "SAN VICENTE",
    province_id: 1,
  },
  {
    id: 122,
    name: "SUIPACHA",
    province_id: 1,
  },
  {
    id: 123,
    name: "TANDIL",
    province_id: 1,
  },
  {
    id: 124,
    name: "TAPALQUE",
    province_id: 1,
  },
  {
    id: 125,
    name: "TIGRE",
    province_id: 1,
  },
  {
    id: 126,
    name: "TORDILLO",
    province_id: 1,
  },
  {
    id: 127,
    name: "TORNQUIST",
    province_id: 1,
  },
  {
    id: 128,
    name: "TRENQUE LAUQUEN",
    province_id: 1,
  },
  {
    id: 129,
    name: "TRES ARROYOS",
    province_id: 1,
  },
  {
    id: 130,
    name: "TRES DE FEBRERO",
    province_id: 1,
  },
  {
    id: 131,
    name: "TRES LOMAS",
    province_id: 1,
  },
  {
    id: 132,
    name: "VICENTE LOPEZ",
    province_id: 1,
  },
  {
    id: 133,
    name: "VILLA GESELL",
    province_id: 1,
  },
  {
    id: 134,
    name: "VILLARINO",
    province_id: 1,
  },
  {
    id: 135,
    name: "ZARATE",
    province_id: 1,
  },
  {
    id: 136,
    name: "AMBATO",
    province_id: 2,
  },
  {
    id: 137,
    name: "ANCASTI",
    province_id: 2,
  },
  {
    id: 138,
    name: "ANDALGALÁ",
    province_id: 2,
  },
  {
    id: 139,
    name: "ANTOFAGASTA DE LA SIERRA",
    province_id: 2,
  },
  {
    id: 140,
    name: "BELEN",
    province_id: 2,
  },
  {
    id: 141,
    name: "CAPAYAN",
    province_id: 2,
  },
  {
    id: 142,
    name: "CAPITAL",
    province_id: 2,
  },
  {
    id: 143,
    name: "EL ALTO",
    province_id: 2,
  },
  {
    id: 144,
    name: "FRAY MAMERTO ESQUIU",
    province_id: 2,
  },
  {
    id: 145,
    name: "LA PAZ",
    province_id: 2,
  },
  {
    id: 146,
    name: "PACLIN",
    province_id: 2,
  },
  {
    id: 147,
    name: "POMAN",
    province_id: 2,
  },
  {
    id: 148,
    name: "SANTA MARIA",
    province_id: 2,
  },
  {
    id: 149,
    name: "SANTA ROSA",
    province_id: 2,
  },
  {
    id: 150,
    name: "TINOGASTA",
    province_id: 2,
  },
  {
    id: 151,
    name: "VALLE VIEJO",
    province_id: 2,
  },
  {
    id: 152,
    name: "1° DE MAYO",
    province_id: 3,
  },
  {
    id: 153,
    name: "12 DE OCTUBRE",
    province_id: 3,
  },
  {
    id: 154,
    name: "2 DE ABRIL",
    province_id: 3,
  },
  {
    id: 155,
    name: "25 DE MAYO",
    province_id: 3,
  },
  {
    id: 156,
    name: "9 DE JULIO",
    province_id: 3,
  },
  {
    id: 157,
    name: "ALMIRANTE BROWN",
    province_id: 3,
  },
  {
    id: 158,
    name: "BERMEJO",
    province_id: 3,
  },
  {
    id: 159,
    name: "CHACABUCO",
    province_id: 3,
  },
  {
    id: 160,
    name: "COMANDANTE FERNANDEZ",
    province_id: 3,
  },
  {
    id: 161,
    name: "FRAY JUSTO SANTA MARÍA DE ORO",
    province_id: 3,
  },
  {
    id: 162,
    name: "GENERAL BELGRANO",
    province_id: 3,
  },
  {
    id: 163,
    name: "GENERAL DONOVAN",
    province_id: 3,
  },
  {
    id: 164,
    name: "GENERAL GUEMES",
    province_id: 3,
  },
  {
    id: 165,
    name: "INDEPENDENCIA",
    province_id: 3,
  },
  {
    id: 166,
    name: "LIBERTAD",
    province_id: 3,
  },
  {
    id: 167,
    name: "LIBERTADOR GENERAL SAN MARTÍN",
    province_id: 3,
  },
  {
    id: 168,
    name: "MAIPU",
    province_id: 3,
  },
  {
    id: 169,
    name: "MAYOR LUIS J FONTANA",
    province_id: 3,
  },
  {
    id: 170,
    name: "O HIGGINS",
    province_id: 3,
  },
  {
    id: 171,
    name: "PRESIDENCIA DE LA PLAZA",
    province_id: 3,
  },
  {
    id: 172,
    name: "QUITILIPI",
    province_id: 3,
  },
  {
    id: 173,
    name: "SAN FERNANDO",
    province_id: 3,
  },
  {
    id: 174,
    name: "SAN LORENZO",
    province_id: 3,
  },
  {
    id: 175,
    name: "SARGENTO CABRAL",
    province_id: 3,
  },
  {
    id: 176,
    name: "TAPENAGA",
    province_id: 3,
  },
  {
    id: 177,
    name: "BIEDMA",
    province_id: 4,
  },
  {
    id: 178,
    name: "CUSHAMEN",
    province_id: 4,
  },
  {
    id: 179,
    name: "ESCALANTE",
    province_id: 4,
  },
  {
    id: 180,
    name: "FLORENTINO AMEGHINO",
    province_id: 4,
  },
  {
    id: 181,
    name: "FUTALEUFU",
    province_id: 4,
  },
  {
    id: 182,
    name: "GAIMAN",
    province_id: 4,
  },
  {
    id: 183,
    name: "GASTRE",
    province_id: 4,
  },
  {
    id: 184,
    name: "LANGUIÑEO",
    province_id: 4,
  },
  {
    id: 185,
    name: "MARTIRES",
    province_id: 4,
  },
  {
    id: 186,
    name: "PASO DE INDIOS",
    province_id: 4,
  },
  {
    id: 187,
    name: "RAWSON",
    province_id: 4,
  },
  {
    id: 188,
    name: "RIO SENGUER",
    province_id: 4,
  },
  {
    id: 189,
    name: "SARMIENTO",
    province_id: 4,
  },
  {
    id: 190,
    name: "TEHUELCHES",
    province_id: 4,
  },
  {
    id: 191,
    name: "TELSEN",
    province_id: 4,
  },
  {
    id: 192,
    name: "COMUNA 1",
    province_id: 5,
  },
  {
    id: 193,
    name: "COMUNA 10",
    province_id: 5,
  },
  {
    id: 194,
    name: "COMUNA 11",
    province_id: 5,
  },
  {
    id: 195,
    name: "COMUNA 12",
    province_id: 5,
  },
  {
    id: 196,
    name: "COMUNA 13",
    province_id: 5,
  },
  {
    id: 197,
    name: "COMUNA 14",
    province_id: 5,
  },
  {
    id: 198,
    name: "COMUNA 15",
    province_id: 5,
  },
  {
    id: 199,
    name: "COMUNA 2",
    province_id: 5,
  },
  {
    id: 200,
    name: "COMUNA 3",
    province_id: 5,
  },
  {
    id: 201,
    name: "COMUNA 4",
    province_id: 5,
  },
  {
    id: 202,
    name: "COMUNA 5",
    province_id: 5,
  },
  {
    id: 203,
    name: "COMUNA 6",
    province_id: 5,
  },
  {
    id: 204,
    name: "COMUNA 7",
    province_id: 5,
  },
  {
    id: 205,
    name: "COMUNA 8",
    province_id: 5,
  },
  {
    id: 206,
    name: "COMUNA 9",
    province_id: 5,
  },
  {
    id: 207,
    name: "CALAMUCHITA",
    province_id: 6,
  },
  {
    id: 208,
    name: "CAPITAL",
    province_id: 6,
  },
  {
    id: 209,
    name: "COLON",
    province_id: 6,
  },
  {
    id: 210,
    name: "CRUZ DEL EJE",
    province_id: 6,
  },
  {
    id: 211,
    name: "GENERAL ROCA",
    province_id: 6,
  },
  {
    id: 212,
    name: "GENERAL SAN MARTIN",
    province_id: 6,
  },
  {
    id: 213,
    name: "ISCHILIN",
    province_id: 6,
  },
  {
    id: 214,
    name: "JUAREZ CELMAN",
    province_id: 6,
  },
  {
    id: 215,
    name: "MARCOS JUAREZ",
    province_id: 6,
  },
  {
    id: 216,
    name: "MINAS",
    province_id: 6,
  },
  {
    id: 217,
    name: "POCHO",
    province_id: 6,
  },
  {
    id: 218,
    name: "PRESIDENTE ROQUE SAENZ PEÑA",
    province_id: 6,
  },
  {
    id: 219,
    name: "PUNILLA",
    province_id: 6,
  },
  {
    id: 220,
    name: "RIO CUARTO",
    province_id: 6,
  },
  {
    id: 221,
    name: "RIO PRIMERO",
    province_id: 6,
  },
  {
    id: 222,
    name: "RIO SECO",
    province_id: 6,
  },
  {
    id: 223,
    name: "RIO SEGUNDO",
    province_id: 6,
  },
  {
    id: 224,
    name: "SAN ALBERTO",
    province_id: 6,
  },
  {
    id: 225,
    name: "SAN JAVIER",
    province_id: 6,
  },
  {
    id: 226,
    name: "SAN JUSTO",
    province_id: 6,
  },
  {
    id: 227,
    name: "SANTA MARÍA",
    province_id: 6,
  },
  {
    id: 228,
    name: "SOBREMONTE",
    province_id: 6,
  },
  {
    id: 229,
    name: "TERCERO ARRIBA",
    province_id: 6,
  },
  {
    id: 230,
    name: "TOTORAL",
    province_id: 6,
  },
  {
    id: 231,
    name: "TULUMBA",
    province_id: 6,
  },
  {
    id: 232,
    name: "UNION",
    province_id: 6,
  },
  {
    id: 233,
    name: "BELLA VISTA",
    province_id: 7,
  },
  {
    id: 234,
    name: "BERON DE ASTRADA",
    province_id: 7,
  },
  {
    id: 235,
    name: "CAPITAL",
    province_id: 7,
  },
  {
    id: 236,
    name: "CONCEPCION",
    province_id: 7,
  },
  {
    id: 237,
    name: "CURUZU CUATIA",
    province_id: 7,
  },
  {
    id: 238,
    name: "EMPEDRADO",
    province_id: 7,
  },
  {
    id: 239,
    name: "ESQUINA",
    province_id: 7,
  },
  {
    id: 240,
    name: "GENERAL ALVEAR",
    province_id: 7,
  },
  {
    id: 241,
    name: "GENERAL PAZ",
    province_id: 7,
  },
  {
    id: 242,
    name: "GOYA",
    province_id: 7,
  },
  {
    id: 243,
    name: "ITATI",
    province_id: 7,
  },
  {
    id: 244,
    name: "ITUZAINGO",
    province_id: 7,
  },
  {
    id: 245,
    name: "LAVALLE",
    province_id: 7,
  },
  {
    id: 246,
    name: "MBURUCUYA",
    province_id: 7,
  },
  {
    id: 247,
    name: "MERCEDES",
    province_id: 7,
  },
  {
    id: 248,
    name: "MONTE CASEROS",
    province_id: 7,
  },
  {
    id: 249,
    name: "PASO DE LOS LIBRES",
    province_id: 7,
  },
  {
    id: 250,
    name: "SALADAS",
    province_id: 7,
  },
  {
    id: 251,
    name: "SAN COSME",
    province_id: 7,
  },
  {
    id: 252,
    name: "SAN LUIS DEL PALMAR",
    province_id: 7,
  },
  {
    id: 253,
    name: "SAN MARTIN",
    province_id: 7,
  },
  {
    id: 254,
    name: "SAN MIGUEL",
    province_id: 7,
  },
  {
    id: 255,
    name: "SAN ROQUE",
    province_id: 7,
  },
  {
    id: 256,
    name: "SANTO TOME",
    province_id: 7,
  },
  {
    id: 257,
    name: "SAUCE",
    province_id: 7,
  },
  {
    id: 258,
    name: "COLON",
    province_id: 8,
  },
  {
    id: 259,
    name: "CONCORDIA",
    province_id: 8,
  },
  {
    id: 260,
    name: "DIAMANTE",
    province_id: 8,
  },
  {
    id: 261,
    name: "FEDERACION",
    province_id: 8,
  },
  {
    id: 262,
    name: "FEDERAL",
    province_id: 8,
  },
  {
    id: 263,
    name: "FELICIANO",
    province_id: 8,
  },
  {
    id: 264,
    name: "GUALEGUAY",
    province_id: 8,
  },
  {
    id: 265,
    name: "GUALEGUAYCHU",
    province_id: 8,
  },
  {
    id: 266,
    name: "ISLAS DEL IBICUY",
    province_id: 8,
  },
  {
    id: 267,
    name: "LA PAZ",
    province_id: 8,
  },
  {
    id: 268,
    name: "NOGOYA",
    province_id: 8,
  },
  {
    id: 269,
    name: "PARANA",
    province_id: 8,
  },
  {
    id: 270,
    name: "SAN SALVADOR",
    province_id: 8,
  },
  {
    id: 271,
    name: "TALA",
    province_id: 8,
  },
  {
    id: 272,
    name: "URUGUAY",
    province_id: 8,
  },
  {
    id: 273,
    name: "VICTORIA",
    province_id: 8,
  },
  {
    id: 274,
    name: "VILLAGUAY",
    province_id: 8,
  },
  {
    id: 275,
    name: "BERMEJO",
    province_id: 9,
  },
  {
    id: 276,
    name: "FORMOSA",
    province_id: 9,
  },
  {
    id: 277,
    name: "LAISHI",
    province_id: 9,
  },
  {
    id: 278,
    name: "MATACOS",
    province_id: 9,
  },
  {
    id: 279,
    name: "PATIÑO",
    province_id: 9,
  },
  {
    id: 280,
    name: "PILAGAS",
    province_id: 9,
  },
  {
    id: 281,
    name: "PILCOMAYO",
    province_id: 9,
  },
  {
    id: 282,
    name: "PIRANE",
    province_id: 9,
  },
  {
    id: 283,
    name: "RAMON LISTA",
    province_id: 9,
  },
  {
    id: 284,
    name: "COCHINOCA",
    province_id: 10,
  },
  {
    id: 285,
    name: "DOCTOR MANUEL BELGRANO",
    province_id: 10,
  },
  {
    id: 286,
    name: "EL CARMEN",
    province_id: 10,
  },
  {
    id: 287,
    name: "HUMAHUACA",
    province_id: 10,
  },
  {
    id: 288,
    name: "LEDESMA",
    province_id: 10,
  },
  {
    id: 289,
    name: "PALPALA",
    province_id: 10,
  },
  {
    id: 290,
    name: "RINCONADA",
    province_id: 10,
  },
  {
    id: 291,
    name: "SAN ANTONIO",
    province_id: 10,
  },
  {
    id: 292,
    name: "SAN PEDRO",
    province_id: 10,
  },
  {
    id: 293,
    name: "SANTA BARBARA",
    province_id: 10,
  },
  {
    id: 294,
    name: "SANTA CATALINA",
    province_id: 10,
  },
  {
    id: 295,
    name: "SUSQUES",
    province_id: 10,
  },
  {
    id: 296,
    name: "TILCARA",
    province_id: 10,
  },
  {
    id: 297,
    name: "TUMBAYA",
    province_id: 10,
  },
  {
    id: 298,
    name: "VALLE GRANDE",
    province_id: 10,
  },
  {
    id: 299,
    name: "YAVI",
    province_id: 10,
  },
  {
    id: 300,
    name: "ATREUCO",
    province_id: 11,
  },
  {
    id: 301,
    name: "CALEU CALEU",
    province_id: 11,
  },
  {
    id: 302,
    name: "CAPITAL",
    province_id: 11,
  },
  {
    id: 303,
    name: "CATRILO",
    province_id: 11,
  },
  {
    id: 304,
    name: "CHALILEO",
    province_id: 11,
  },
  {
    id: 305,
    name: "CHAPALEUFU",
    province_id: 11,
  },
  {
    id: 306,
    name: "CHICAL CO",
    province_id: 11,
  },
  {
    id: 307,
    name: "CONHELO",
    province_id: 11,
  },
  {
    id: 308,
    name: "CURACO",
    province_id: 11,
  },
  {
    id: 309,
    name: "GUATRACHE",
    province_id: 11,
  },
  {
    id: 310,
    name: "HUCAL",
    province_id: 11,
  },
  {
    id: 311,
    name: "LIHUEL CALEL",
    province_id: 11,
  },
  {
    id: 312,
    name: "LIMAY MAHUIDA",
    province_id: 11,
  },
  {
    id: 313,
    name: "LOVENTUE",
    province_id: 11,
  },
  {
    id: 314,
    name: "MARACO",
    province_id: 11,
  },
  {
    id: 315,
    name: "PUELEN",
    province_id: 11,
  },
  {
    id: 316,
    name: "QUEMU QUEMU",
    province_id: 11,
  },
  {
    id: 317,
    name: "RANCUL",
    province_id: 11,
  },
  {
    id: 318,
    name: "REALICO",
    province_id: 11,
  },
  {
    id: 319,
    name: "TOAY",
    province_id: 11,
  },
  {
    id: 320,
    name: "TRENEL",
    province_id: 11,
  },
  {
    id: 321,
    name: "UTRACAN",
    province_id: 11,
  },
  {
    id: 322,
    name: "ARAUCO",
    province_id: 12,
  },
  {
    id: 323,
    name: "CAPITAL",
    province_id: 12,
  },
  {
    id: 324,
    name: "CASTRO BARROS",
    province_id: 12,
  },
  {
    id: 325,
    name: "CHAMICAL",
    province_id: 12,
  },
  {
    id: 326,
    name: "CHILECITO",
    province_id: 12,
  },
  {
    id: 327,
    name: "CORONEL FELIPE VARELA",
    province_id: 12,
  },
  {
    id: 328,
    name: "FAMATINA",
    province_id: 12,
  },
  {
    id: 329,
    name: "GENERAL ÁNGEL VERA PEÑALOZA",
    province_id: 12,
  },
  {
    id: 330,
    name: "GENERAL BELGRANO",
    province_id: 12,
  },
  {
    id: 331,
    name: "GENERAL JUAN F QUIROGA",
    province_id: 12,
  },
  {
    id: 332,
    name: "GENERAL LAMADRID",
    province_id: 12,
  },
  {
    id: 333,
    name: "GENERAL OCAMPO",
    province_id: 12,
  },
  {
    id: 334,
    name: "GENERAL SAN MARTÍN",
    province_id: 12,
  },
  {
    id: 335,
    name: "INDEPENDENCIA",
    province_id: 12,
  },
  {
    id: 336,
    name: "ROSARIO VERA PEÑALOZA",
    province_id: 12,
  },
  {
    id: 337,
    name: "SAN BLAS DE LOS SAUCES",
    province_id: 12,
  },
  {
    id: 338,
    name: "SANAGASTA",
    province_id: 12,
  },
  {
    id: 339,
    name: "VINCHINA",
    province_id: 12,
  },
  {
    id: 340,
    name: "CAPITAL",
    province_id: 13,
  },
  {
    id: 341,
    name: "GENERAL ALVEAR",
    province_id: 13,
  },
  {
    id: 342,
    name: "GODOY CRUZ",
    province_id: 13,
  },
  {
    id: 343,
    name: "GUAYMALLEN",
    province_id: 13,
  },
  {
    id: 344,
    name: "JUNIN",
    province_id: 13,
  },
  {
    id: 345,
    name: "LA PAZ",
    province_id: 13,
  },
  {
    id: 346,
    name: "LAS HERAS",
    province_id: 13,
  },
  {
    id: 347,
    name: "LAVALLE",
    province_id: 13,
  },
  {
    id: 348,
    name: "LUJAN DE CUYO",
    province_id: 13,
  },
  {
    id: 349,
    name: "MAIPU",
    province_id: 13,
  },
  {
    id: 350,
    name: "MALARGUE",
    province_id: 13,
  },
  {
    id: 351,
    name: "RIVADAVIA",
    province_id: 13,
  },
  {
    id: 352,
    name: "SAN CARLOS",
    province_id: 13,
  },
  {
    id: 353,
    name: "SAN MARTIN",
    province_id: 13,
  },
  {
    id: 354,
    name: "SAN RAFAEL",
    province_id: 13,
  },
  {
    id: 355,
    name: "SANTA ROSA",
    province_id: 13,
  },
  {
    id: 356,
    name: "TUNUYAN",
    province_id: 13,
  },
  {
    id: 357,
    name: "TUPUNGATO",
    province_id: 13,
  },
  {
    id: 358,
    name: "25 DE MAYO",
    province_id: 14,
  },
  {
    id: 359,
    name: "APOSTOLES",
    province_id: 14,
  },
  {
    id: 360,
    name: "CAINGUAS",
    province_id: 14,
  },
  {
    id: 361,
    name: "CANDELARIA",
    province_id: 14,
  },
  {
    id: 362,
    name: "CAPITAL",
    province_id: 14,
  },
  {
    id: 363,
    name: "CONCEPCION",
    province_id: 14,
  },
  {
    id: 364,
    name: "ELDORADO",
    province_id: 14,
  },
  {
    id: 365,
    name: "GENERAL MANUEL BELGRANO",
    province_id: 14,
  },
  {
    id: 366,
    name: "GUARANI",
    province_id: 14,
  },
  {
    id: 367,
    name: "IGUAZU",
    province_id: 14,
  },
  {
    id: 368,
    name: "LEANDRO N. ALEM",
    province_id: 14,
  },
  {
    id: 369,
    name: "LIBERTADOR GENERAL SAN MARTÍN",
    province_id: 14,
  },
  {
    id: 370,
    name: "MONTECARLO",
    province_id: 14,
  },
  {
    id: 371,
    name: "OBERA",
    province_id: 14,
  },
  {
    id: 372,
    name: "SAN IGNACIO",
    province_id: 14,
  },
  {
    id: 373,
    name: "SAN JAVIER",
    province_id: 14,
  },
  {
    id: 374,
    name: "SAN PEDRO",
    province_id: 14,
  },
  {
    id: 375,
    name: "ALUMINE",
    province_id: 15,
  },
  {
    id: 376,
    name: "AÑELO",
    province_id: 15,
  },
  {
    id: 377,
    name: "CATAN LIL",
    province_id: 15,
  },
  {
    id: 378,
    name: "CHOS MALAL",
    province_id: 15,
  },
  {
    id: 379,
    name: "COLLON CURA",
    province_id: 15,
  },
  {
    id: 380,
    name: "CONFLUENCIA",
    province_id: 15,
  },
  {
    id: 381,
    name: "HUILICHES",
    province_id: 15,
  },
  {
    id: 382,
    name: "LACAR",
    province_id: 15,
  },
  {
    id: 383,
    name: "LONCOPUE",
    province_id: 15,
  },
  {
    id: 384,
    name: "LOS LAGOS",
    province_id: 15,
  },
  {
    id: 385,
    name: "MINAS",
    province_id: 15,
  },
  {
    id: 386,
    name: "ÑORQUIN",
    province_id: 15,
  },
  {
    id: 387,
    name: "PEHUENCHES",
    province_id: 15,
  },
  {
    id: 388,
    name: "PICUN LEUFU",
    province_id: 15,
  },
  {
    id: 389,
    name: "PICUNCHES",
    province_id: 15,
  },
  {
    id: 390,
    name: "ZAPALA",
    province_id: 15,
  },
  {
    id: 391,
    name: "25 DE MAYO",
    province_id: 16,
  },
  {
    id: 392,
    name: "9 DE JULIO",
    province_id: 16,
  },
  {
    id: 393,
    name: "ADOLFO ALSINA",
    province_id: 16,
  },
  {
    id: 394,
    name: "AVELLANEDA",
    province_id: 16,
  },
  {
    id: 395,
    name: "BARILOCHE",
    province_id: 16,
  },
  {
    id: 396,
    name: "CONESA",
    province_id: 16,
  },
  {
    id: 397,
    name: "EL CUY",
    province_id: 16,
  },
  {
    id: 398,
    name: "GENERAL ROCA",
    province_id: 16,
  },
  {
    id: 399,
    name: "ÑORQUINCO",
    province_id: 16,
  },
  {
    id: 400,
    name: "PICHI MAHUIDA",
    province_id: 16,
  },
  {
    id: 401,
    name: "PILCANIYEU",
    province_id: 16,
  },
  {
    id: 402,
    name: "SAN ANTONIO",
    province_id: 16,
  },
  {
    id: 403,
    name: "VALCHETA",
    province_id: 16,
  },
  {
    id: 404,
    name: "ANTA",
    province_id: 17,
  },
  {
    id: 405,
    name: "CACHI",
    province_id: 17,
  },
  {
    id: 406,
    name: "CAFAYATE",
    province_id: 17,
  },
  {
    id: 407,
    name: "CAPITAL",
    province_id: 17,
  },
  {
    id: 408,
    name: "CERRILLOS",
    province_id: 17,
  },
  {
    id: 409,
    name: "CHICOANA",
    province_id: 17,
  },
  {
    id: 410,
    name: "GENERAL GUEMES",
    province_id: 17,
  },
  {
    id: 411,
    name: "GENERAL JOSE DE SAN MARTÍN",
    province_id: 17,
  },
  {
    id: 412,
    name: "GUACHIPAS",
    province_id: 17,
  },
  {
    id: 413,
    name: "IRUYA",
    province_id: 17,
  },
  {
    id: 414,
    name: "LA CALDERA",
    province_id: 17,
  },
  {
    id: 415,
    name: "LA CANDELARIA",
    province_id: 17,
  },
  {
    id: 416,
    name: "LA POMA",
    province_id: 17,
  },
  {
    id: 417,
    name: "LA VIÑA",
    province_id: 17,
  },
  {
    id: 418,
    name: "LOS ANDES",
    province_id: 17,
  },
  {
    id: 419,
    name: "METAN",
    province_id: 17,
  },
  {
    id: 420,
    name: "MOLINOS",
    province_id: 17,
  },
  {
    id: 421,
    name: "ORAN",
    province_id: 17,
  },
  {
    id: 422,
    name: "RIVADAVIA",
    province_id: 17,
  },
  {
    id: 423,
    name: "ROSARIO DE LA FRONTERA",
    province_id: 17,
  },
  {
    id: 424,
    name: "ROSARIO DE LERMA",
    province_id: 17,
  },
  {
    id: 425,
    name: "SAN CARLOS",
    province_id: 17,
  },
  {
    id: 426,
    name: "SANTA VICTORIA",
    province_id: 17,
  },
  {
    id: 427,
    name: "25 DE MAYO",
    province_id: 18,
  },
  {
    id: 428,
    name: "9 DE JULIO",
    province_id: 18,
  },
  {
    id: 429,
    name: "ALBARDON",
    province_id: 18,
  },
  {
    id: 430,
    name: "ANGACO",
    province_id: 18,
  },
  {
    id: 431,
    name: "CALINGASTA",
    province_id: 18,
  },
  {
    id: 432,
    name: "CAPITAL",
    province_id: 18,
  },
  {
    id: 433,
    name: "CAUCETE",
    province_id: 18,
  },
  {
    id: 434,
    name: "CHIMBAS",
    province_id: 18,
  },
  {
    id: 435,
    name: "IGLESIA",
    province_id: 18,
  },
  {
    id: 436,
    name: "JACHAL",
    province_id: 18,
  },
  {
    id: 437,
    name: "POCITO",
    province_id: 18,
  },
  {
    id: 438,
    name: "RAWSON",
    province_id: 18,
  },
  {
    id: 439,
    name: "RIVADAVIA",
    province_id: 18,
  },
  {
    id: 440,
    name: "SAN MARTIN",
    province_id: 18,
  },
  {
    id: 441,
    name: "SANTA LUCIA",
    province_id: 18,
  },
  {
    id: 442,
    name: "SARMIENTO",
    province_id: 18,
  },
  {
    id: 443,
    name: "ULLUM",
    province_id: 18,
  },
  {
    id: 444,
    name: "VALLE FERTIL",
    province_id: 18,
  },
  {
    id: 445,
    name: "ZONDA",
    province_id: 18,
  },
  {
    id: 446,
    name: "AYACUCHO",
    province_id: 19,
  },
  {
    id: 447,
    name: "BELGRANO",
    province_id: 19,
  },
  {
    id: 448,
    name: "CHACABUCO",
    province_id: 19,
  },
  {
    id: 449,
    name: "CORONEL PRINGLES",
    province_id: 19,
  },
  {
    id: 450,
    name: "GENERAL PEDERNERA",
    province_id: 19,
  },
  {
    id: 451,
    name: "GOBERNADOR DUPUY",
    province_id: 19,
  },
  {
    id: 452,
    name: "JUAN MARTÍN DE PUEYRREDÓN",
    province_id: 19,
  },
  {
    id: 453,
    name: "JUNIN",
    province_id: 19,
  },
  {
    id: 454,
    name: "LIBERTADOR GENERAL SAN MARTÍN",
    province_id: 19,
  },
  {
    id: 455,
    name: "CORPEN AIKE",
    province_id: 20,
  },
  {
    id: 456,
    name: "DESEADO",
    province_id: 20,
  },
  {
    id: 457,
    name: "GUER AIKE",
    province_id: 20,
  },
  {
    id: 458,
    name: "LAGO ARGENTINO",
    province_id: 20,
  },
  {
    id: 459,
    name: "LAGO BUENOS AIRES",
    province_id: 20,
  },
  {
    id: 460,
    name: "MAGALLANES",
    province_id: 20,
  },
  {
    id: 461,
    name: "RÍO CHICO",
    province_id: 20,
  },
  {
    id: 462,
    name: "9 DE JULIO",
    province_id: 21,
  },
  {
    id: 463,
    name: "BELGRANO",
    province_id: 21,
  },
  {
    id: 464,
    name: "CASEROS",
    province_id: 21,
  },
  {
    id: 465,
    name: "CASTELLANOS",
    province_id: 21,
  },
  {
    id: 466,
    name: "CONSTITUCION",
    province_id: 21,
  },
  {
    id: 467,
    name: "GARAY",
    province_id: 21,
  },
  {
    id: 468,
    name: "GENERAL LOPEZ",
    province_id: 21,
  },
  {
    id: 469,
    name: "GENERAL OBLIGADO",
    province_id: 21,
  },
  {
    id: 470,
    name: "IRIONDO",
    province_id: 21,
  },
  {
    id: 471,
    name: "LA CAPITAL",
    province_id: 21,
  },
  {
    id: 472,
    name: "LAS COLONIAS",
    province_id: 21,
  },
  {
    id: 473,
    name: "ROSARIO",
    province_id: 21,
  },
  {
    id: 474,
    name: "SAN CRISTOBAL",
    province_id: 21,
  },
  {
    id: 475,
    name: "SAN JAVIER",
    province_id: 21,
  },
  {
    id: 476,
    name: "SAN JERONIMO",
    province_id: 21,
  },
  {
    id: 477,
    name: "SAN JUSTO",
    province_id: 21,
  },
  {
    id: 478,
    name: "SAN LORENZO",
    province_id: 21,
  },
  {
    id: 479,
    name: "SAN MARTIN",
    province_id: 21,
  },
  {
    id: 480,
    name: "VERA",
    province_id: 21,
  },
  {
    id: 481,
    name: "AGUIRRE",
    province_id: 22,
  },
  {
    id: 482,
    name: "ALBERDI",
    province_id: 22,
  },
  {
    id: 483,
    name: "ATAMISQUI",
    province_id: 22,
  },
  {
    id: 484,
    name: "AVELLANEDA",
    province_id: 22,
  },
  {
    id: 485,
    name: "BANDA",
    province_id: 22,
  },
  {
    id: 486,
    name: "BELGRANO",
    province_id: 22,
  },
  {
    id: 487,
    name: "CAPITAL",
    province_id: 22,
  },
  {
    id: 488,
    name: "CHOYA",
    province_id: 22,
  },
  {
    id: 489,
    name: "COPO",
    province_id: 22,
  },
  {
    id: 490,
    name: "FIGUEROA",
    province_id: 22,
  },
  {
    id: 491,
    name: "GENERAL TABOADA",
    province_id: 22,
  },
  {
    id: 492,
    name: "GUASAYAN",
    province_id: 22,
  },
  {
    id: 493,
    name: "JIMENEZ",
    province_id: 22,
  },
  {
    id: 494,
    name: "JUAN F IBARRA",
    province_id: 22,
  },
  {
    id: 495,
    name: "LORETO",
    province_id: 22,
  },
  {
    id: 496,
    name: "MITRE",
    province_id: 22,
  },
  {
    id: 497,
    name: "MORENO",
    province_id: 22,
  },
  {
    id: 498,
    name: "OJO DE AGUA",
    province_id: 22,
  },
  {
    id: 499,
    name: "PELLEGRINI",
    province_id: 22,
  },
  {
    id: 500,
    name: "QUEBRACHOS",
    province_id: 22,
  },
  {
    id: 501,
    name: "RIO HONDO",
    province_id: 22,
  },
  {
    id: 502,
    name: "RIVADAVIA",
    province_id: 22,
  },
  {
    id: 503,
    name: "ROBLES",
    province_id: 22,
  },
  {
    id: 504,
    name: "SALAVINA",
    province_id: 22,
  },
  {
    id: 505,
    name: "SAN MARTIN",
    province_id: 22,
  },
  {
    id: 506,
    name: "SARMIENTO",
    province_id: 22,
  },
  {
    id: 507,
    name: "SILIPICA",
    province_id: 22,
  },
  {
    id: 508,
    name: "ANTÁRTIDA ARGENTINA",
    province_id: 23,
  },
  {
    id: 509,
    name: "ISLAS DEL ATLANTICO SUR",
    province_id: 23,
  },
  {
    id: 510,
    name: "RIO GRANDE",
    province_id: 23,
  },
  {
    id: 511,
    name: "TOLHUIN",
    province_id: 23,
  },
  {
    id: 512,
    name: "USHUAIA",
    province_id: 23,
  },
  {
    id: 513,
    name: "BURRUYACU",
    province_id: 24,
  },
  {
    id: 514,
    name: "CAPITAL",
    province_id: 24,
  },
  {
    id: 515,
    name: "CHICLIGASTA",
    province_id: 24,
  },
  {
    id: 516,
    name: "CRUZ ALTA",
    province_id: 24,
  },
  {
    id: 517,
    name: "FAMAILLA",
    province_id: 24,
  },
  {
    id: 518,
    name: "GRANEROS",
    province_id: 24,
  },
  {
    id: 519,
    name: "JUAN B ALBERDI",
    province_id: 24,
  },
  {
    id: 520,
    name: "LA COCHA",
    province_id: 24,
  },
  {
    id: 521,
    name: "LEALES",
    province_id: 24,
  },
  {
    id: 522,
    name: "LULES",
    province_id: 24,
  },
  {
    id: 523,
    name: "MONTEROS",
    province_id: 24,
  },
  {
    id: 524,
    name: "RIO CHICO",
    province_id: 24,
  },
  {
    id: 525,
    name: "SIMOCA",
    province_id: 24,
  },
  {
    id: 526,
    name: "TAFI DEL VALLE",
    province_id: 24,
  },
  {
    id: 527,
    name: "TAFI VIEJO",
    province_id: 24,
  },
  {
    id: 528,
    name: "TRANCAS",
    province_id: 24,
  },
  {
    id: 529,
    name: "YERBA BUENA",
    province_id: 24,
  },
];

export const insertDepartmentsSeeder = async () => {
  try {
    // Check if at least one register exists
    const existingRegister = await DepartmentModel.findOne();

    if (!existingRegister) {
      // Make bulk insert if there are no registers
      return await DepartmentModel.bulkCreate(departmentsToCreate, {
        ignoreDuplicates: true,
      });
    }

  } catch (e) {
    console.error("Error inserting departments: ", e);
  }
};

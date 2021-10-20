const cornerComms = {
    "BDL-BDR" : "[U': [R', U' L U]]",
    "BDL-DBR" : "[U R: [D2, R U' R']]",
    "BDL-DFL" : "[x': [D2, R U2 R']]",
    "BDL-DFR" : "[U'D' R': [R' D R, U]]",
    "BDR-DBL" : "[R U' D' : [D2, R' U R]]",
    "BDR-DFL" : "[D' R: [R D' R', U']]",
    "BDR-DFR" : "[D' R D: [U, R' D' R]]",
    "BUL-BDL" : "[U' R' U': [R D' R', U']]",
    "BUL-BDR" : "[R2 U : [R D R', U2]]",
    "BUL-DBL" : "[U'D R': [R' D R, U']]",
    "BUL-DBR" : "[U R : [D', R U' R']]",
    "BUL-DFL" : "[U' R': [R' D R, U']]",
    "BUL-DFR" : "[U'D' R': [R' D R, U']]",
    "BUR-BDL" : "[R' U: [D2, R U' R']]",
    "BUR-BDR" : "[R U': [R' U R, D]]",
    "BUR-BUL" : "[R, U' L' U]",
    "BUR-DBL" : "[R U': [R' U R, D']] ",
    "BUR-DBR" : "[D R U': [R' U R, D']]",
    "BUR-DFL" : "[UD R' U': [R U R', D']]",
    "BUR-DFR" : "[U R' U': [R U R', D']]",
    "DBR-DBL" : "[z: [R U2 R', D2]]",
    "DFL-DBL" : "[x U: [R' D R, U2]]",
    "DFL-DBR" : "[U' R2: [R2 U R2 U' R2, D]]",
    "DFL-DFR" : "[U' R' F' : [R U' R', D']]",
    "DFR-DBL" : "[R U' R' U: [R D' R', U2]]",
    "DFR-DBR" : "[F' R U': [R' D' R, U2]]",
    "FDL-BDL" : "[D' R D': [R' U' R, D2]]",
    "FDL-BDR" : "[D: [R U R', D2]]",
    "FDL-BUL" : "[D x': [R U' R', D']]",
    "FDL-BUR" : "[R', U L' U']",
    "FDL-DBL" : "[Lw' D: [R' D' R, U']]",
    "FDL-DBR" : "[D R: [R D' R', U']]",
    "FDL-DFR" : "[R U' R': [R' D R, U2]]",
    "FDL-RDB" : "[R D: [D, R' U' R]]",
    "FDL-RDF" : "[D, R U R']",
    "FDL-RUB" : "[F' U: [R' D' R, U2]]",
    "FDR-BDL" : "[U: [R U' R', D2]]",
    "FDR-BDR" : "[D R D: [R' U' R, D2]]",
    "FDR-BUL" : "[R: [U' L' U, R]]",
    "FDR-BUR" : "[D' R' U: [R U' R', D]]",
    "FDR-DBL" : "[z: [R U2 R', D]]",
    "FDR-DBR" : "[U R D': [U', R' D R]]",
    "FDR-DFL" : "[R : [R' U R U', F2]]",
    "FDR-FDL" : "[U L' U', R]",
    "FDR-RDB" : "[U: [R U' R', D']]",
    "FDR-RUB" : "[U' R' U: [R D R', U2]]",
    "FUL-BDL" : "[D R' D : [F2, D' R D R']]",
    "FUL-BDR" : "[R U: [R' D' R, U2]]",
    "FUL-BUL" : "[R U R' D': [U2, R' D R]]",
    "FUL-BUR" : "[R D'U: [R' D' R, U2]]",
    "FUL-DBL" : "[R: [R D' R', U2]]",
    "FUL-DBR" : "[D R: [R D' R', U2]]",
    "FUL-DFL" : "[R UD: [R' D' R, U2]]",
    "FUL-DFR" : "[D' R UD: [R' D' R, U2]]",
    "FUL-FDL" : "[R U: [R' D R, U2]]",
    "FUL-FDR" : "[R': [R D' R' D, F2]]",
    "FUL-RDB" : "[Lw' U': [R D R', U2]]",
    "FUL-RDF" : "[Lw': [R' D' R, U2]]",
    "FUL-RUB" : "[R' : [U', R2 D' R2 D R2]]",
    "LDF-BDL" : "[UD: [R U' R', D]]",
    "LDF-BDR" : "[R' U' R: [U2, R' D R]]",
    "LDF-BUL" : "[Lw U2: [R D' R', U]]",
    "LDF-BUR" : "[R' U: [R U' R', D]]",
    "LDF-DBL" : "[F': [R U' R', D2]]",
    "LDF-DBR" : "[U R : [D, R U' R']]",
    "LDF-DFR" : "[UD R D' : [U', R' D R]]",
    "LDF-FDR" : "[U: [D, R U' R']]",
    "LDF-FUL" : "[D R': [F2, R D' R' D]]",
    "LDF-LFB" : "[z': [R U' R', D']]",
    "LDF-RDB" : "[DU: [R U' R', D2]]",
    "LDF-RDF" : "[U R' D: [R U' R', D2]]",
    "LDF-RUB" : "[U R U: [R' D R, U2]]",
    "LFB-BDR" : "[D': [D', R U R']]",
    "LFB-BUL" : "[U2 R: [R D' R', U]]",
    "LFB-BUR" : "[U' L U, R]",
    "LFB-DBR" : "[R D' R': [R' D R, U]]",
    "LFB-DFL" : "[R D R' D: [R U R', D2]]",
    "LFB-DFR" : "[D2 R: [R D' R', U']]",
    "LFB-FDL" : "[D2: [R U R', D']]",
    "LFB-FDR" : "[U R U': [R D' R', U']]",
    "LFB-FUL" : "[Lw': [U2, R' D R]]",
    "LFB-RDB" : "[R D': [R' U' R, D2]]",
    "LFB-RDF" : "[D2, R U R']",
    "LFB-RUB" : "[U R: [R D' R', U2]]",
    "LUB-BDL" : "[U R': [U', R' D2 R]]",
    "LUB-BDR" : "[R U: [R' D' R, U]]",
    "LUB-BUR" : "[U R': [U', R' D' R]]",
    "LUB-DBL" : "[R: [R D' R', U]]",
    "LUB-DBR" : "[D R: [R D' R', U]]",
    "LUB-DFL" : "[R: [R D2 R', U]]",
    "LUB-DFR" : "[D2 R: [R D' R', U]]",
    "LUB-FDL" : "[R U: [R' D R, U]]",
    "LUB-FDR" : "[R U R' : [R' D' R, U']]",
    "LUB-FUL" : "[Lw' U: [R D' R', U2]]",
    "LUB-LDF" : "[U R' U': [R' D R, U]]",
    "LUB-LFB" : "[R D': [R D R', U]]",
    "LUB-LUF" : "[L, U' R' U]",
    "LUB-RDB" : "[R D: [R D R', U]]",
    "LUB-RDF" : "[D' R U : [R' D R, U]]",
    "LUB-RUB" : "[R: [R2' D R2 D' R2', U]]",
    "LUF-BDL" : "[x': [R U2 R', D]]",
    "LUF-BDR" : "[F: [D', R U R']]",
    "LUF-BUL" : "[x': [R U' R', D]]",
    "LUF-BUR" : "[R', U L U']",
    "LUF-DBL" : "[R2 D2: [R U' R', D]]",
    "LUF-DBR" : "[z: [D2, R U R']]",
    "LUF-DFL" : "[U' R' U: [R U' R', D]]",
    "LUF-DFR" : "[R U' R': [R' D' R, U2]]",
    "LUF-FDL" : "[D R' U': [D', R U R']]",
    "LUF-FDR" : "[R, U L U']",
    "LUF-LDF" : "[R' U' : [D, R U R']]",
    "LUF-LFB" : "[z: [R' D' R, U2]]",
    "LUF-RDB" : "[R' U': [R' D' R, U2]]",
    "LUF-RDF" : "[R' U': [D', R U R']]",
    "LUF-RUB" : "[F' U: [R' D R, U2]]",
    "RDB-BDL" : "[U': [R' U' R, D']]",
    "RDB-BUL" : "[R' U: [R' D' R, U]]",
    "RDB-BUR" : "[U' R U: [R' U' R, D]]",
    "RDB-DBL" : "[R2 D2: [R U R', D]]",
    "RDB-DFL" : "[U' R': [R' D R, U]]",
    "RDB-DFR" : "[R U' D' R' : [R' D R, U2]]",
    "RDB-RDF" : "[R D': [R' D R, U]]",
    "RDF-BDL" : "[x': [R U2 R', D']]",
    "RDF-BDR" : "[R U R', D']",
    "RDF-BUL" : "[x': [R U' R', D']]",
    "RDF-BUR" : "[R D: [R D' R', U']]",
    "RDF-DBL" : "[R: [R D' R', U']]",
    "RDF-DBR" : "[R U' R' D R: [U, R D' R']]",
    "RDF-DFL" : "[R D: [U, R' D' R]]",
    "RUB-BDL" : "[U' R' U': [R D' R', U2]]",
    "RUB-BDR" : "[UD R: [U2, R D' R']]",
    "RUB-BUL" : "[U R: [U2, R D R']]",
    "RUB-DBL" : "[U'D R': [R' D R, U2]]",
    "RUB-DBR" : "[F': [U2, R D R']]",
    "RUB-DFL" : "[U' R': [R' D R, U2]]",
    "RUB-DFR" : "[U' D' R': [R' D R, U2]]",
    "RUB-RDB" : "[U R U': [R' D' R, U2]]",
    "RUB-RDF" : "[U' R' U'D: [R D' R', U2]]",
    "UBL-BDL" : "[R' D2 R, U2]",
    "UBL-BDR" : "[U' D: [R D' R', U2]]",
    "UBL-BUR" : "[R' D': [U2, R' D R]]",
    "UBL-DBL" : "[D' R D' R': [R' D R, U2]]",
    "UBL-DBR" : "[R D' R': [R' D R, U2]]",
    "UBL-DFL" : "[R F' R' U': [R D R', U2]]",
    "UBL-DFR" : "[D R D' R': [R' D R, U2]]",
    "UBL-FDL" : "[U'D': [R D' R', U2]]",
    "UBL-FDR" : "[DU': [R D R', U2]]",
    "UBL-FUL" : "[Lw': [U2, R' D2 R]]",
    "UBL-LDF" : "[R' D R, U2]",
    "UBL-LFB" : "[U': [R D' R', U2]]",
    "UBL-LUF" : "[F: [U2, R' D' R]]",
    "UBL-RDB" : "[U': [R D R', U2]]",
    "UBL-RDF" : "[R' D' R, U2]",
    "UBL-RUB" : "[R D R': [R' D2 R, U2]]",
    "UBR-BDL" : "[R' D2 R, U]",
    "UBR-BDR" : "[D: [U', R D' R']]",
    "UBR-BUL" : "[R': [R' D' R, U2]]",
    "UBR-DBL" : "[x: [R' U' R, D2]]",
    "UBR-DBR" : "[U R D' R': [U', R' D R]]",
    "UBR-DFL" : "[x': [D2, R U R']]",
    "UBR-DFR" : "[U' R' D R: [R D' R', U]]",
    "UBR-FDL" : "[D: [R' D' R, U]]",
    "UBR-FDR" : "[D': [R' D R, U]]",
    "UBR-FUL" : "[R: [U2, R D R']]",
    "UBR-LDF" : "[R' D R, U]",
    "UBR-LFB" : "[U', R D' R']",
    "UBR-LUB" : "[R: [U, R D R']]",
    "UBR-LUF" : "[R': [R' D' R, U']]",
    "UBR-RDB" : "[U', R D R']",
    "UBR-RDF" : "[R' D' R, U]",
    "UBR-UBL" : "[Lw': [R' D2 R, U]]",
    "UBR-UFL" : "[Lw D: [R' D' R, U]]",
    "UFL-BDL" : "[R' D2 R, U']",
    "UFL-BDR" : "[D': [R' D' R, U']]",
    "UFL-BUL" : "[U' R': [U', R' D' R]]",
    "UFL-BUR" : "[U' R: [R D R', U]]",
    "UFL-DBL" : "[R' D' R : [R U' R', D]]",
    "UFL-DBR" : "[R D' R': [R' D R, U']]",
    "UFL-DFL" : "[U' x': [R U R', D2]]",
    "UFL-DFR" : "[D R D' R': [R' D R, U']]",
    "UFL-FDL" : "[D: [R' D' R, U']]",
    "UFL-FDR" : "[D': [R' D R, U']]",
    "UFL-LDF" : "[R' D R, U']",
    "UFL-LFB" : "[U': [R D' R', U']]",
    "UFL-LUB" : "[U' R: [R D R', U2]]",
    "UFL-RDB" : "[U': [R D R', U']]",
    "UFL-RDF" : "[R' D' R, U']",
    "UFL-RUB" : "[U' R': [U2, R' D' R]]",
    "UFL-UBL" : "[R' D'U': [R' D R, U']]"
};
const edgeComms = {
    "BD-BL" : "[U: [L, U M U']]",
    "BD-BR" : "Mirror BDBL",
    "BD-DF" : "[D': [R F R', S']] ",
    "BD-DL" : "[U: [L2, U M U']]",
    "BD-DR" : "Mirror BDDL",
    "BD-FL" : "[U: [L', U M U']]",
    "BD-FR" : "Mirror BDFL",
    "BD-LB" : "[U' M: [R E' R', U]]",
    "BD-LD" : "[U x': [E, L' U' L]]",
    "BD-LF" : "[U' M : [R' E R, U]]",
    "BD-LU" : "[R' F R U': [M, U2]]",
    "BD-RB" : "Mirror BDLB",
    "BD-RD" : "Mirror BDLD",
    "BD-RF" : "Mirror BDLF",
    "BD-RU" : "Mirror BDLU",
    "BD-UB" : "[U' M' U : [M', U2]]",
    "BD-UL" : "[D: [L' E' L, U]]",
    "BD-UR" : "Mirror BDUL",
    "BL-BR" : "[R U' R: [E', R2]]",
    "BL-DL" : "[D2U' R: [E', R2]]",
    "BL-DR" : "[U' R: [E', R2]]",
    "BL-LD" : "[D: [M', U L U']]",
    "BL-LF" : "[L U L', E']",
    "BL-LU" : "[U' Lw U': [M', U2]]",
    "BL-RB" : "[L U L', E]",
    "BL-RD" : "[D': [M', U L U']]",
    "BL-RF" : "[L: [U, L E' L']]",
    "BL-RU" : "[M': [R E' R', U]]",
    "BR-DL" : "Mirror BLDR",
    "BR-DR" : "Mirror BLDL",
    "BR-LB" : "Mirror BLRB",
    "BR-LD" : "Mirror BLRD",
    "BR-LF" : "Mirror BLRF",
    "BR-LU" : "Mirror BLRU",
    "BR-RD" : "Mirror BLLD",
    "BR-RF" : "Mirror BLLF",
    "BR-RU" : "Mirror BLLU",
    "BU-BD" : "[U' x': [R U R', E]]",
    "BU-BL" : "[U L U', M]",
    "BU-BR" : "Mirror BUBL",
    "BU-DB" : "[U x': [E, R U R']]",
    "BU-DF" : "[U: [S, R' F' R]]",
    "BU-DL" : "[U L2 U', M]",
    "BU-DR" : "Mirror BUDL",
    "BU-FD" : "[U': [R' F' R, S]]",
    "BU-FL" : "[U L' U', M]",
    "BU-FR" : "Mirror BUFL",
    "BU-LB" : "[M', U' L U]",
    "BU-LD" : "[M', U' L2 U]",
    "BU-LF" : "[M', U' L' U]",
    "BU-LU" : "[L': [M', U' L U]]",
    "BU-RB" : "Mirror BULB",
    "BU-RD" : "Mirror BULD",
    "BU-RF" : "Mirror BULF",
    "BU-RU" : "Mirror BULU",
    "BU-UL" : "[L: [U L' U', M]]",
    "BU-UR" : "Mirror BUUL",
    "DB-BL" : "[U' L U': [M, U2]]",
    "DB-BR" : "Mirror DBBL",
    "DB-DL" : "[U' L2 U': [M, U2]]",
    "DB-DR" : "Mirror DBDL",
    "DB-FL" : "[U' L' U': [M, U2]]",
    "DB-FR" : "Mirror DBFL",
    "DB-LB" : "[M': [U' L U, M2]]",
    "DB-LD" : "[U : [L B' L', S']]",
    "DB-LF" : "[M': [U' L' U, M2]]",
    "DB-LU" : "[D: [S, L F' L']]",
    "DB-RB" : "Mirror DBLB",
    "DB-RD" : "Mirror DBLD",
    "DB-RF" : "Mirror DBLF",
    "DB-RU" : "Mirror DBLU",
    "DB-UL" : "[L' U' L U': [M, U2]]",
    "DB-UR" : "Mirror DBUL",
    "DF-BL" : "[U' L U: [M', U2]]",
    "DF-BR" : "Mirror DFBL",
    "DF-DB" : "[D2, M]",
    "DF-DL" : "[M' U2 M, D]",
    "DF-DR" : "Mirror DFDL",
    "DF-FL" : "[U' L' U: [M', U2]]",
    "DF-FR" : "Mirror DFFL",
    "DF-LB" : "[F: [L2, E']]",
    "DF-LD" : "[L F: [L2, E']]",
    "DF-LF" : "[L2 F: [L2, E']]",
    "DF-LU" : "[D': [S, L F' L']]",
    "DF-RB" : "Mirror DFLB",
    "DF-RD" : "Mirror DFLD",
    "DF-RF" : "Mirror DFLF",
    "DF-RU" : "Mirror DFLU",
    "DF-UL" : "[U', M U2 M]",
    "DF-UR" : "Mirror DFUL",
    "DL-DR" : "[D': [M, D2]]",
    "DL-LB" : "[Uw L: [E, L2]]",
    "DL-LF" : "[UE L': [E', L2]]",
    "DL-LU" : "[S, L F' L']",
    "DL-RB" : "[Uw L': [E', L2]]",
    "DL-RD" : "[S', R F R']",
    "DL-RF" : "[UE L: [E, L2]]",
    "DL-RU" : "[Lw': [R' E R, U]]",
    "DL-UL" : "[L' U' L: [S', L2]]",
    "DR-LB" : "Mirror DLRB",
    "DR-LD" : "Mirror DLRD",
    "DR-LF" : "Mirror DLRF",
    "DR-LU" : "Mirror DLRU",
    "DR-RB" : "Mirror DLLB",
    "DR-RF" : "Mirror DLLF",
    "DR-RU" : "Mirror DLLU",
    "DR-UR" : "Mirror DLUL",
    "FD-BD" : "[U M': [U', M U2 M]]",
    "FD-BL" : "[U L U', M']",
    "FD-BR" : "Mirror FDBL",
    "FD-DB" : "[D: [R F R', S']]",
    "FD-DL" : "[U L2 U', M']",
    "FD-DR" : "Mirror FDDL",
    "FD-FL" : "[U L' U', M']",
    "FD-FR" : "Mirror FDFL",
    "FD-LB" : "[M': [U' L U, M']]",
    "FD-LD" : "[U: [S, L F L']]",
    "FD-LF" : "[M': [U' L' U, M']]",
    "FD-LU" : "[Lw': [U' L U, M']]",
    "FD-RB" : "Mirror FDLB",
    "FD-RD" : "Mirror FDLD",
    "FD-RF" : "Mirror FDLF",
    "FD-RU" : "Mirror FDLU",
    "FD-UB" : "[R' F': [E, R U R']]",
    "FD-UL" : "[Lw': [M, U L U']]",
    "FD-UR" : "Mirror FDUL",
    "FL-BL" : "[U' L: [S', L2]]",
    "FL-BR" : "[R U' R': [E, R2]]",
    "FL-DL" : "[D2U' R': [E, R2]]",
    "FL-DR" : "[U' R': [E, R2]]",
    "FL-FR" : "[R' U' R': [E, R2]]",
    "FL-LB" : "[L' U L, E']",
    "FL-LD" : "[D: [M', U L' U']]",
    "FL-LU" : "[M' U: [U, R' E R]]",
    "FL-RB" : "[L': [U, L' E L]] ",
    "FL-RD" : "[D': [M', U L' U']]",
    "FL-RF" : "[L' U L, E]",
    "FL-RU" : "[S U' R': [E, R2]]",
    "FR-BL" : "Mirror FLBR",
    "FR-BR" : "Mirror FLBL",
    "FR-DL" : "Mirror FLDR",
    "FR-DR" : "Mirror FLDL",
    "FR-LB" : "Mirror FLRB",
    "FR-LD" : "Mirror FLRD",
    "FR-LF" : "Mirror FLRF",
    "FR-LU" : "Mirror FLRU",
    "FR-RB" : "Mirror FLLB",
    "FR-RD" : "Mirror FLLD",
    "FR-RU" : "Mirror FLLU",
    "LB-RB" : "[Uw R: [S, R2]]",
    "LD-LB" : "[U S' U', L']",
    "LD-RB" : "[M' U' L: [E, L2]]",
    "LD-RD" : "[R' F R': [S', R2]]",
    "LF-LB" : "[E' R U' R: [E', R2]]",
    "LF-LD" : "[L, U S' U']",
    "LF-RB" : "[Rw U R': [E, R2]]",
    "LF-RD" : "[M' U R': [E, R2]]",
    "LF-RF" : "[U E R': [S, R2]]",
    "LU-LB" : "[S: [U', R E' R']]",
    "LU-LD" : "[S' D': [M, D2]]",
    "LU-LF" : "[S: [U', R' E R]]",
    "LU-RB" : "[Rw' U: [M', U2]]",
    "LU-RD" : "[R' F R: [S, R2]]",
    "LU-RF" : "[RM U: [M', U2]]",
    "LU-RU" : "[M U: [M', U2]]",
    "RD-LB" : "Mirror LDRB",
    "RD-LD" : "Mirror LDRD",
    "RD-RB" : "Mirror LDLB",
    "RF-LB" : "Mirror LFRB",
    "RF-LD" : "Mirror LFRD",
    "RF-LF" : "Mirror LFRF",
    "RF-RB" : "Mirror LFLB",
    "RF-RD" : "Mirror LFLD",
    "RU-LB" : "Mirror LURB",
    "RU-LD" : "Mirror LURD",
    "RU-LF" : "Mirror LURF",
    "RU-RB" : "Mirror LULB",
    "RU-RD" : "Mirror LULD",
    "RU-RF" : "Mirror LULF",
    "UB-BL" : "[L' U: [S', L2]]",
    "UB-BR" : "Mirror UBBL",
    "UB-DB" : "[M, U2]",
    "UB-DF" : "[U2, M']",
    "UB-DL" : "[U: [S', L2]]",
    "UB-DR" : "Mirror UBDL",
    "UB-FL" : "[L U: [S', L2]]",
    "UB-FR" : "Mirror UBFL",
    "UB-LB" : "[U': [R E' R', U2]]",
    "UB-LD" : "[U: [L' E' L, U2]]",
    "UB-LF" : "[U': [R' E R , U2]]",
    "UB-LU" : "[U' M U': [M', U2]]",
    "UB-RB" : "Mirror UBLLFB",
    "UB-RD" : "Mirror UBLD",
    "UB-RF" : "Mirror UBLF",
    "UB-RU" : "Mirror UBLU",
    "UB-UL" : "[U' M2 U: [M, U2]]",
    "UB-UR" : "Mirror UBUL",
    "UL-BL" : "[U': [R' E2 R, U']]",
    "UL-BR" : "[U, L E2 L']",
    "UL-DL" : "[L U' L: [S', L2]]",
    "UL-DR" : "[Rw2 U': [M, U2]]",
    "UL-FL" : "[U': [R E2 R', U']]",
    "UL-FR" : "[U, L' E2 L]",
    "UL-LB" : "[U': [R E' R', U']]",
    "UL-LD" : "[U, L' E' L]",
    "UL-LF" : "[U': [R' E R, U']]",
    "UL-RB" : "[U, L' E L]",
    "UL-RD" : "[U': [R E R', U']]",
    "UL-RF" : "[U, L E' L']",
    "UL-RU" : "[S, R' F R]",
    "UL-UR" : "[M2 U': [M, U2]]",
    "UR-BL" : "Mirror ULBR",
    "UR-BR" : "Mirror ULBL",
    "UR-DL" : "Mirror ULDR",
    "UR-DR" : "Mirror ULDL",
    "UR-FL" : "Mirror ULFR",
    "UR-FR" : "Mirror ULFL",
    "UR-LB" : "Mirror ULRB",
    "UR-LD" : "Mirror ULRD",
    "UR-LF" : "Mirror ULRF",
    "UR-LU" : "Mirror ULRU",
    "UR-RB" : "Mirror ULLB",
    "UR-RD" : "Mirror ULLD",
    "UR-RF" : "Mirror ULLF"
};
const flippedComms = {
    "BLLB" : "LBUR URBL",
    "BRRB" : "R' [URRU alg]",
    "DBBD" : "U2 M [UBBU alg]",
    "DFFD" : "M2 U2 M U R' F' R S R' F R S' U M",
    "DLLD" : "Mirror DRRD",
    "DRRD" : "S' R' F R U' M' U2 M U' S R' F' R",
    "FLLF" : "LFUR URFL",
    "FRRF" : "R [URRU alg]",
    "UBBU" : "U' S R' F' R S' R' F R U' M' U2 M",
    "ULLU" : "U' [URRU alg]",
    "URRU" : "R' E2 R2 E' R' U' R E R2 E2 R U"
};
const twistedComms = {
    "BDL" : "(R U' R' U) (R D' R' U') (R U R' U') (R D R' U)",
    "BDR" : "U (R U' R' D') (R U R' U') (R U R' D) (R U' R')",
    "BUL" : "[U2, R' D R D' R' D R]",
    "BUR" : "[R' D R D' R' D R, U]",
    "FDL" : "(R' D R U) (R' U' R U) (R' D' R U') (R' U R U')",
    "FDR" : "U (R' U' R U) (R' D' R U') (R' U R U') (R' D R)",
    "FUL" : "[R' D R D' R' D R, U']",
    "LDF" : "U (R' U' R U) (R' D R U') (R' U R U') (R' D' R)",
    "LFB" : "U' (R D' R' U) (R U' R' U) (R D R' U') (R U R')",
    "LUB" : "[R' D R D' R' D R, U2]",
    "LUF" : "[U', R' D R D' R' D R]",
    "RDB" : "(R U R' D') (R U' R' U) (R U' R' D) (R U R' U')",
    "RDF" : "(R' D' R U) (R' U' R U) (R' D R U') (R' U R U')",
    "RUB" : "[U, R' D R D' R' D R]"
};
const m2 = {
    "BD" : "M2 D U R2 U' M' U R2 U' M D'",
    "BL" : "U' L U M2 U' L' U",
    "BR" : "U R' U' M2 U R U'",
    "BU" : "B' R B U R2 U' M2 U R2 U' B' R' B",
    "DB" : "M U2 M U2",
    "DL" : "U' L2 U M2 U' L2 U",
    "DR" : "U R2 U' M2 U R2 U'",
    "FL" : "U' L' U M2 U' L U",
    "FR" : "U R U' M2 U R' U'",
    "FU" : "D M' U R2 U' M U R2 U' D' M2",
    "LB" : "Uw' L' Uw M2 Uw' L Uw",
    "LD" : "B L B' M2 B L' B'",
    "LF" : "B L2 B' M2 B L2 B'",
    "LU" : "B L' B' M2 B L B'",
    "RB" : "Uw R Uw' M2 Uw R' Uw'",
    "RD" : "B' R' B M2 B' R B",
    "RF" : "B' R2 B M2 B' R2 B",
    "RU" : "B' R B M2 B' R' B",
    "UB" : "M2",
    "UF" : "U2 M' U2 M'",
    "UL" : "L U' L' U M2 U' L U L'",
    "UR" : "R' U R U' M2 U R' U' R"
};
const op = {
    "BDL" : "[D' R: [R U' R' U' R U R' F' R U R' U' R' F R]",
    "BDR" : "[D': [R U' R' U' R U R' F' R U R' U' R' F R]",
    "BUR" : "[R F: [R U' R' U' R U R' F' R U R' U' R' F R]",
    "DBL" : "[D F': [R U' R' U' R U R' F' R U R' U' R' F R]",
    "DBR" : "[R2 F: [R U' R' U' R U R' F' R U R' U' R' F R]",
    "DFL" : "[F': [R U' R' U' R U R' F' R U R' U' R' F R]",
    "DFR" : "[D' F': [R U' R' U' R U R' F' R U R' U' R' F R]",
    "FDL" : "[D: [R U' R' U' R U R' F' R U R' U' R' F R]",
    "FDR" : "[F D: [R U' R' U' R U R' F' R U R' U' R' F R]",
    "FUL" : "[F' D: [R U' R' U' R U R' F' R U R' U' R' F R]",
    "FUR" : "[F2 D: [R U' R' U' R U R' F' R U R' U' R' F R]",
    "LDB" : "[D2: [R U' R' U' R U R' F' R U R' U' R' F R]",
    "LDF" : "[D2 R: [R U' R' U' R U R' F' R U R' U' R' F R]",
    "LUF" : "[F2: [R U' R' U' R U R' F' R U R' U' R' F R]",
    "RDB" : "[R: [R U' R' U' R U R' F' R U R' U' R' F R]",
    "RDF" : "[R U' R' U' R U R' F' R U R' U' R' F R]",
    "RUB" : "[R': [R U' R' U' R U R' F' R U R' U' R' F R]",
    "RUF" : "[R2: [R U' R' U' R U R' F' R U R' U' R' F R]",
    "UBR" : "[R D': [R U' R' U' R U R' F' R U R' U' R' F R]",
    "UFL" : "[F R': [R U' R' U' R U R' F' R U R' U' R' F R]",
    "UFR" : "[F: [R U' R' U' R U R' F' R U R' U' R' F R]"
};
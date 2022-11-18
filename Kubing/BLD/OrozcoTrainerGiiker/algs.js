const ufr_ubr = [
    {target:"UBL",alg:"[x R2: [R U R', D2]]",scramble:"R2 U' F2 U B2 U' F2 U B2 R2"},
    {target:"BUR",alg:"[U, R' D' R D R' D' R]",scramble:"F2 U R U' L2 U R' D' F2 D' R2 U L2 U' R2 U R2 U2 B2 L2 U2 B2 L2 D2 R2"},
    {target:"UBR",alg:"",scramble:""},
    {target:"FUL",alg:"[R2: [D, R' U2 R]]",scramble:"L D R2 D' L' R2 U F2 U F2 U' R2 U F2 R2 U2 F2 U2 R2 U2 F2"},
    {target:"UFL",alg:"[U' x R2: [R U R', D2]]",scramble:"R2 F2 U' F2 U B2 U' F2 U F2 U2 R2 U2 B2 R2 F2 D2 B2 D2 F2 U2"},
    {target:"LUB",alg:"[R2: [D, R' U R]]",scramble:"R U R D R' U' R D' R2"},
    {target:"LDB",alg:"[R D' R', U']",scramble:"R' U L2 U' R B2 U L2 U R2 D2 F2 D2 R2 U2"},
    {target:"BUL",alg:"[R2: [R U2 R', D']]",scramble:"R U' B2 U B2 U R' B2 U R2 U B2 U2 R2 U' F2 D2 L2 B2 D2 F2 U2"},
    {target:"BDR",alg:"[U, D' R' D' R]",scramble:"D R' U L2 U' R B2 U L2 D' R2 U' R2 U2 F2 U2 R2 U2 F2 U2"},
    {target:"RUB",alg:"[U, R' D R D' R' D R]",scramble:"F2 D' R' U L2 U' R U R2 D' F2 U B2 U' F2 U' D2 F2 D2 U2 F2 L2 D2 U2 R2"},
    {target:"RDF",alg:"[U, R' D' R]",scramble:"D2 R' U L2 U' R B2 U L2 U' D2 R2 U2 F2 U2 R2"},
    {target:"FDL",alg:"[U, D R' D' R]",scramble:"D' R' U L2 U' R B2 U L2 D' R2 U' R2 D2 F2 D2 R2 D2 F2"},
    {target:"LUF",alg:"[R2: [R U' R', D']]",scramble:"R D L2 D' R F2 U B2 U F2 D2 L2 D2 F2 U2 R2 F2 R2"},
    {target:"BDL",alg:"[D' R D R', U']",scramble:"L' D R2 D' L' R2 U F2 U F2 U' R2 U F2 R2 U2 F2 U2 R2 U2 F2 L2"},
    {target:"DBR",alg:"[D x: [D2, R' U' R]]",scramble:"U R2 U B2 U' R2 U' R2 U2 B2 U2 R2"},
    {target:"RDB",alg:"[R D R', U']",scramble:"U' L U' R2 U L U F2 U' L2 U R2 F2 D2 B2 D2 R2 U2 R2 F2 U2"},
    {target:"DFR",alg:"[D' x': [R U R', D2]]",scramble:"U R2 U B2 U' R2 U R2 F2 D2 B2 L2 D2 F2 R2 U2 B2 U2"},
    {target:"FDR",alg:"[U, D' R' D R]",scramble:"B2 R U L2 U' R' U L2 U' B2"},
    {target:"DFL",alg:"[x': [R U R', D2]]",scramble:"D' B2 U L2 D' R2 U' D2 F2 L2 D2 U2 R2 D2 U2"},
    {target:"LDF",alg:"[U, R' D R]",scramble:"U R U' L2 U R U B2 U' R2 U R2 B2 D2 B2 D2 R2 U2 L2 F2"},
    {target:"DBL",alg:"[x: [D2, R' U' R]]",scramble:"R2 F2 U' R2 U L2 U' R2 U L2 F2 R2"},
];
const uf_ur = [
    {target:"UB",alg:"[U M2 U': [M, U2]]",scramble:"F2 U R2 F2 R2 U R2 U2 R2 U2 F2 R2 F2 U2 F2 U2"},
    {target:"BU",alg:"[R' U' R U, M]",scramble:"B' R B' U' B2 U2 R' D' R' U' L2 F2 D' B2 U F2 U2 D2 L2 D2 B2 R2 F2 L2 U2"},
    {target:"UR",alg:"",scramble:""},
    {target:"RU",alg:"[M': [R U R' U', Rw' U2 R]]",scramble:"F R' F' D' R U' R U R' U' L2 R2 D R2 U' F2 R2 D2 B2 D2 R2 U2 F2"},
    {target:"UL",alg:"[M2 U': [M, U2]]",scramble:"F2 U' R2 F2 R2 U' R2 F2 U2 R2 F2 R2 U2 R2"},
    {target:"LU",alg:"[S, U' R U R']",scramble:"R' F' U' F' U2 F2 D R2 D' R' B2 L2 U R2 F2 U R2 U R2 F2 L2 R2 D2 R2 B2 R2 B2"},
    {target:"LB",alg:"[R E' R', U']",scramble:"B' U' B' R' U L U L' U R U L2 F2 U R2 D' R2 U F2 U2 F2 L2 U2 R2 U2 B2 U2 R2"},
    {target:"BL",alg:"[R' E2 R, U']",scramble:"R U2 B2 U2 R' U' R2 B2 R2 U' F2 R2 D2 L2 U2 F2 D2 F2 U2 R2 F2"},
    {target:"BR",alg:"[E R E' R', U']",scramble:"U2 L' D2 F2 U2 R' F2 U R2 F2 R2 U D2 R2 F2 D2 L2 F2 R2 U2 L2 U2"},
    {target:"RB",alg:"[U: [U, L' E L]]",scramble:"B U' B' R' U L U L' U R U L2 F2 U R2 D' R2 U' R2 F2 U2 B2 L2 F2 R2 D2 F2 U2"},
    {target:"RF",alg:"[U: [U, L E' L']]",scramble:"F' U F R U' L' U' L U' R' U R2 B2 D F2 U' R2 U F2 D2 B2 R2 F2 R2 D2 B2 D2 R2"},
    {target:"FR",alg:"[R, M U M' U']",scramble:"F2 R' U2 F2 U2 R' D L2 F2 R2 U F2 D2 F2 D2 L2 B2 U2 F2 U2"},
    {target:"FL",alg:"[R E2 R', U']",scramble:"R' U2 F2 U2 R' D' L2 B2 R2 U' B2 U2 F2 D2 R2 B2 D2 F2 U2 F2"},
    {target:"LF",alg:"[R' E R, U']",scramble:"F U F R U' L' U' L U' R L2 D L2 B2 U R2 U' R2 U F2 R2 B2 U2 R2 D2 L2 B2 D2"},
    {target:"BD",alg:"(M U' M' U')2",scramble:"B R B' U' B2 U2 R' D' R' U' L2 F2 D' B2 U F2 L2 D2 B2 R2 B2 R2 U2 F2"},
    {target:"DB",alg:"[R' U' R U, M2]",scramble:"F2 U R2 F2 R2 U R2 F2 U2 F2 L2 B2 L2 R2 U2 R2"},
    {target:"RD",alg:"[R E R', U']",scramble:"D' F' R' F' D' R U' R U R B2 F2 U F2 U R2 F2 L2 B2 U2 R2 U2 R2 U2 B2 U2"},
    {target:"DR",alg:"[R' U R: [S, R2]]",scramble:"D' L2 B2 R2 U' B2 L2 F2"},
    {target:"FD",alg:"[R U' R' U, M']",scramble:"F' R' F' D' R U' R U R' B2 U' B2 F2 U F2 U' B2 U2 B2 R2 D2 R2 F2"},
    {target:"DF",alg:"[U, M U2 M]",scramble:"F2 U R2 F2 R2 U' R2 U2 R2 U2 F2 R2 U2 F2 U2 F2 U2"},
    {target:"LD",alg:"[U, M D M']",scramble:"L' F U F' U2 F2 U F2 U L' U R2 F2 U R2 U B2 L2 D2 R2 F2 R2 B2"},
    {target:"DL",alg:"[R U R': [S, U2]]",scramble:"D L2 B2 R2 U' B2 L2 F2 D2"},
];
const uf_bu = [
    {target:"UB",alg:"M' U' M' U' M' U' M' U2 M' U' M' U' M' U' M'",scramble:"F U' R' U' F D R U B2 R B2 R F2 L2 F2 R2 D' F2 R2 U' F2 U2 F2 U2 B2 R2 U2 L2 F2 L2"},
    {target:"BU",alg:"",scramble:""},
    {target:"UR",alg:"[M, R' U' R U]",scramble:"F U' R' U' F D R U B2 R B2 R' D B2 D L2 D R2 U F2 U2 R2 F2 D2 B2 D2 U2 R2"},
    {target:"RU",alg:"[R U R' U', M']",scramble:"F R' F' D' R U' R U R' L2 D2 R2 F2 R2 U' F2 U2 R2 F2 R2 B2 L2 U2 R2 U2 F2"},
    {target:"UL",alg:"[U2: [M', R U R' U']]",scramble:"F U' R' U' F D R U B2 R B2 R B2 R2 B2 R2 D' R2 U R2 U2 F2 R2 U2 R2 U2"},
    {target:"LU",alg:"[L' U' L U, M']",scramble:"F' L F' U' B2 D2 R' U' R' U' F2 L2 U' R2 U R2 F2 U2 B2 R2 U2 L2 F2 L2 F2"},
    {target:"LB",alg:"[U' L U, M']",scramble:"F' L2 F' U' D' B2 D2 R' U2 R' D' U' B2 D2 U2 F2 D2 U2 L2 U2"},
    {target:"BL",alg:"[M, U L U']",scramble:"F U' R' U' F' U' R' U' L2 U' F2 R' F2 R2 F2 L2 U F2 R2 U' R2 F2 U2 R2 B2 D2 B2 U2 L2 F2"},
    {target:"BR",alg:"[M, U' R' U]",scramble:"F U' R' U' F' L' U L R' U R U2 F2 R2 F2 U F2 U2 R2 F2 R2 F2 R2 F2 U2 R2 F2"},
    {target:"RB",alg:"[U R' U', M']",scramble:"F R2 F' U' D' F2 D2 R' U2 R' D' U' R2 U2 F2"},
    {target:"RF",alg:"[U R U', M']",scramble:"U F' U' F' U B2 U L' R2 U L' D' B2 R2 B2 U' R2 U L2 B2 F2 U2 R2 B2 R2"},
    {target:"FR",alg:"[M, U' R U]",scramble:"F U' R' U' F' U' R D B2 R U2 R' D' R2 U B2 U' R2 U' F2 L2 B2 D2 B2 F2 L2 B2 R2"},
    {target:"FL",alg:"[M, U L' U']",scramble:"F U' R' U' F' U' R' U F2 U F2 R' F2 D2 L2 R2 D R2 U' R2 U2 L2 U2 F2 D2 B2 R2 F2 U2 L2"},
    {target:"LF",alg:"[U' L' U, M']",scramble:"U F U' F' U B2 U L' R2 U L' D' B2 D2 B2 U' R2 U' R2 D2 R2 U2 B2 R2 F2 R2"},
    {target:"BD",alg:"[U': [S, R B R']]",scramble:"D' F R F' D' F2 D2 R' U' R' D2 F2 D' F2 R2 U' F2 L2 U2 L2 F2 D2 F2 D2 U2"},
    {target:"DB",alg:"[U: [R B R', S]]",scramble:"F U' R' U' F D R U B2 R B2 R F2 L2 F2 R2 D' F2 R2 U' R2 F2 D2 L2 D2 B2 U2 F2 R2 B2"},
    {target:"RD",alg:"[U R2 U', M']",scramble:"F R F' D' F2 D2 R' U' R' U' R2 U F2 L2 U F2 U2 R2 D2 R2 U2 R2 B2 U2 R2 F2"},
    {target:"DR",alg:"[M, U' R2 U]",scramble:"F U' R' U' F D R U B2 R B2 R B2 D B2 U B2 U2 F2 U2 L2 F2 U2 F2 D2"},
    {target:"FD",alg:"[U': [S, R' F' R]]",scramble:"U' F' R' F' D' R U' R U R U B2 R2 U' R2 D2 B2 L2 F2 R2 F2 U2 B2 R2"},
    {target:"DF",alg:"[U: [R' F' R, S]]",scramble:"F U' R' U' F D R U B2 R B2 R F2 L2 F2 R2 D' F2 R2 U' F2 U2 L2 R2 B2 D2 L2 U2"},
    {target:"LD",alg:"[U' L2 U, M']",scramble:"F' L' F' D B2 U R D R' D R2 U B2 U F2 U R2 U2 R2 D2 B2 U2 F2 R2 B2 F2 U2"},
    {target:"DL",alg:"[M, U L2 U']",scramble:"F U' R' U' F D R U B2 R B2 R B2 U B2 L2 U R2 F2 L2 R2 D2 L2 R2 B2 R2"},
];
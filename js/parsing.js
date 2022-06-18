const palette641 = [];
const palette8500 = [];

function createColor(id, name, rgb, ral, cmyk, pantone, tikkurila) {
  palette641.push({
    id: id,
    name: name,
    rgb: rgb,
    ral: ral ? ral : null,
    cmyk: cmyk,
    pantone: pantone ? pantone.toUpperCase() : null,
    tikkurila: tikkurila ? tikkurila.toUpperCase() : null,
  });
}

function createNewColor(text = "", palette = palette641) {
  let [id, name, rgb, ral, cmyk, , pantone, tikkurila] = text.split("\n");

  id = Number(id);

  rgb = rgb
    .replace("RGB", "")
    .trim()
    .split("-")
    .map((el) => Number(el));
  // rgb = rgb.map(el => Number(el));

  ral = Number(ral.replace("RAL", "").trim());
  ral = ral ? ral : null;

  cmyk = cmyk
    .replace("CMYK", "")
    .trim()
    .split("-")
    .map((el) => Number(el));

  pantone = pantone.replace("PANTONE", "").trim();
  pantone = pantone ? pantone : null;

  tikkurila = tikkurila.replace("TIKKURILA", "").trim();
  tikkurila = tikkurila ? tikkurila : null;

  palette.push({
    id: id,
    name: name,
    rgb: rgb,
    ral: ral,
    cmyk: cmyk,
    pantone: pantone,
    tikkurila: tikkurila,
  });
}

createColor(0, "прозрачный", null, null, null, null, null);
createColor(10, "белый", [231, 234, 238], 9003, [0, 0, 0, 0], "", "");
createColor(
  20,
  "золотисто-жёлтый",
  [252, 166, 0],
  1033,
  [2, 43, 94, 0],
  "136 с",
  "m 305"
);
createColor(
  19,
  "ярко-жёлтый",
  [232, 167, 0],
  1003,
  [6, 42, 97, 0],
  "128 c",
  "s 303"
);
createColor(
  21,
  "жёлтый",
  [254, 198, 0],
  1023,
  [0, 28, 95, 0],
  "108 c",
  "m 302"
);
createColor(22, "светло-жёлтый", [242, 203, 0], 1021, [, , ,], "", "");
createColor(
  25,
  "серно-жёлтый",
  [241, 225, 14],
  1016,
  [5, 9, 87, 0],
  "102 C",
  "X 300"
);
createColor(
  26,
  "пурпурно-красный",
  [94, 5, 14],
  0,
  [35, 80, 51, 60],
  "504 C",
  "M 422"
);
createColor(
  312,
  "бургунди",
  [116, 2, 16],
  0,
  [29, 92, 89, 47],
  "505 C",
  "M 423"
);
createNewColor(`30
темно-красный
RGB 145-8-20
RAL 3003
CMYK 27-98-93-31
HEX 971B1E
PANTONE 7420 C
TIKKURILA N 330`);
createNewColor(`31
красный
RGB 175-0-11
RAL 3000
CMYK 22-99-98-12
HEX B42024
PANTONE 1805 C
TIKKURILA N 323`);
createNewColor(`32
светло-красный
RGB 199-12-0
RAL
CMYK 16-95-100-5
HEX CC2027
PANTONE 485 C
TIKKURILA M 320`);
createNewColor(`47
красно-оранжевый
RGB 211-48-0
RAL
CMYK 13-95-100-3
HEX D83427
PANTONE 7417 C
TIKKURILA M 319`);
createNewColor(`34
оранжевый
RGB 221-68-0
RAL 2004
CMYK 9-83-97-2
HEX E04926
PANTONE 7416 C
TIKKURILA M 315`);
createNewColor(`36
светло-оранжевый
RGB 236-102-0
RAL 2008
CMYK 5-72-99-1
HEX EF6923
PANTONE 158 C
TIKKURILA M 313`);
createNewColor(`35
пастельно-оранжевый
RGB 225-109-0
RAL 2003
CMYK 0-70-96-0
HEX F37121
PANTONE 165 C
TIKKURILA N 312`);
createNewColor(`404
пурпурный
RGB 65-40-114
RAL 7447
CMYK 93-88-18-8
HEX 402A72
PANTONE 273 C
TIKKURILA N 346`);
createNewColor(`40
фиолетовый
RGB 93-43-104
RAL
CMYK 72-82-20-17
HEX 5F2B67
PANTONE 268 C
TIKKURILA M 342`);
createNewColor(`43
лавандовый
RGB 120-95-162
RAL 4005
CMYK 67-62-4-2
HEX 7960A2
PANTONE 223 C
TIKKURILA K 345`);
createNewColor(`42
сиреневый
RGB 186-148-188
RAL 9010
CMYK 67-62-4-2
HEX BA95BD
PANTONE 529 C
TIKKURILA J 342`);
createNewColor(`41
малиновый
RGB 195-40-106
RAL
CMYK 20-91-21-5
HEX CA2A69
PANTONE 7424 C
TIKKURILA М 331`);
createNewColor(`45
светло-розовый
RGB 239-135-184
RAL
CMYK 20-91-0-0
HEX F389B7
PANTONE 211 C
TIKKURILA J 330`);
createNewColor(`562
глубокое синее море
RGB 19-29-57
RAL
CMYK 77-65-34-72
HEX 111D38
PANTONE 2767 C
TIKKURILA N 348`);
createNewColor(`518
стальной синий
RGB 15-17-58
RAL 5013
CMYK 80-64-30-67
HEX 0E1339
PANTONE 2768 C
TIKKURILA N 350`);
createNewColor(`50
темно-синий
RGB 28-47-94
RAL 5013
CMYK 91-64-20-43
HEX 1C315E
PANTONE 281 C
TIKKURILA М 333`);
createNewColor(`65
кобальтовый синий
RGB 13-31-106
RAL 5002
CMYK 100-83-22-24
HEX 242B65
PANTONE 2758 C
TIKKURILA М 351`);
createNewColor(`49
королевский синий
RGB 23-43-121
RAL 2736
CMYK 100-81-18-16
HEX 283474
PANTONE 2747 C
TIKKURILA М 352`);
createNewColor(`86
ярко-синий
RGB 27-47-170
RAL
CMYK 100-77-0-0
HEX 21419A
PANTONE
TIKKURILA М 355`);
createNewColor(`67
синий
RGB 0-58-120
RAL 5017
CMYK 100-71-9-5
HEX 203D76
PANTONE 294 C?
TIKKURILA М 361`);
createNewColor(`57
сине-голубой
RGB 0-65-142
RAL
CMYK 100-71-12-7
HEX 1D458B
PANTONE
TIKKURILA N 358`);
createNewColor(`51
генцианово-голубой
RGB 0-69-131
RAL
CMYK 98-65-16-16
HEX 194682
PANTONE 2955 C
TIKKURILA M 359`);
createNewColor(`98
генциановый
RGB 0-79-159
RAL 5015
CMYK 99-64-5-2
HEX 03509E
PANTONE 2945 C?
TIKKURILA L 358`);
createNewColor(`52
лазурный
RGB 0-94-173
RAL
CMYK 96-53-4-2
HEX 0E5FAD
PANTONE 2945 C?
TIKKURILA K 358`);
createNewColor(`84
небесный
RGB 0-116-187
RAL
CMYK 93-40-4-2
HEX 0473BB
PANTONE 3005 C?
TIKKURILA K 360`);
createNewColor(`53
светло-голубой
RGB 0-136-195
RAL
CMYK 87-26-4-6
HEX 0887C3
PANTONE 299 C
TIKKURILA J 360`);
createNewColor(`56
ледяной голубой
RGB 67-162-211
RAL
CMYK 74-15-7-2
HEX 40A1D3
PANTONE 298 C?
TIKKURILA J 361`);
createNewColor(`66
бирюзово-синий
RGB 0-131-142
RAL
CMYK 86-21-39-15
HEX 018190
PANTONE 3145 C
TIKKURILA L 366`);
createNewColor(`54
бирюзовый
RGB 0-155-151
RAL
CMYK 83-13-44-4
HEX 009999
PANTONE 320 C?
TIKKURILA S 371`);
createNewColor(`55
цвет мяты
RGB 95-206-183
RAL 6005
CMYK 55-0-36-0
HEX 62C5B6
PANTONE 3255 C
TIKKURILA J 372`);
createNewColor(`60
темно-зеленый
RGB 0-60-36
RAL
CMYK 74-34-63-62
HEX 013C24
PANTONE 3302 C
TIKKURILA N 376`);
createNewColor(`613
зеленый лесной
RGB 0-82-54
RAL 6029
CMYK 84-26-71-45
HEX 015138
PANTONE 3292 C
TIKKURILA N 373`);
createNewColor(`61
зеленый
RGB 0-122-77
RAL
CMYK 84-23-77-20
HEX 03794F
PANTONE 341 C
TIKKURILA L 372`);
createNewColor(`68
зеленая трава
RGB 0-120-63
RAL
CMYK 81-20-86-11
HEX 007641
PANTONE 341 C
TIKKURILA М 372`);
createNewColor(`62
светло-зеленый
RGB 0-137-58
RAL 6018
CMYK 81-20-90-11
HEX 028844
PANTONE 355 C?
TIKKURILA L 375`);
createNewColor(`64
желто-зеленый
RGB 35-155-17
RAL
CMYK 68-19-100-7
HEX 129A48
PANTONE 7482 C?
TIKKURILA L 381`);
createNewColor(`63
липово-зеленый
RGB 106-167-47
RAL 8017
CMYK 54-16-91-7
HEX 69A643
PANTONE 369 C?
TIKKURILA K 383`);
createNewColor(`80
черный
RGB 85-51-28
RAL 8023
CMYK 63-52-51-90
HEX 070809
PANTONE Black
TIKKURILA Y 498`);
createNewColor(`83
темно-серый
RGB 175-89-30
RAL 1011
CMYK 60-46-47-46
HEX 4A4C4C
PANTONE 425 C
TIKKURILA X 498`);
createNewColor(`81
серый
RGB 168-135-90
RAL
CMYK 53-36-38-20
HEX 747E7B
PANTONE 430 C?
TIKKURILA N 498`);
createNewColor(`82
асфальтовый
RGB 138-143-140
RAL 7035
CMYK 21-22-38-3
HEX 8A8F8C
PANTONE
TIKKURILA Х 395`);
createNewColor(`23
средне-серый
RGB 192-195-195
RAL 9006
CMYK 5-15-45-0
HEX BFC3C4
PANTONE 1205 C
TIKKURILA H 393`);
createNewColor(`70
светло-серый
RGB 6-6-7
RAL 7043
CMYK 29-17-19-1
HEX 9D9E99
PANTONE 427 C
TIKKURILA H 499`);
createNewColor(`73
коричневый
RGB 75-76-76
RAL 7005
CMYK 52-55-58-64
HEX 56351C
PANTONE 411 C?
TIKKURILA M 483`);
createNewColor(`71
ореховый
RGB 117-125-124
RAL 7045
CMYK 22-72-93-15
HEX B25B27
PANTONE 471 C
TIKKURILA S 409`);
createNewColor(`76
светло-коричневый
RGB 128-133-136
RAL 7042
CMYK 28-43-62-17
HEX A98759
PANTONE 465 C
TIKKURILA Y 401`);
createNewColor(`74
бежевый
RGB 205-192-158
RAL
CMYK 48-34-34-15
HEX 7F8688
PANTONE 430 C?
TIKKURILA N 500`);
createNewColor(`72
кремовый
RGB 213-210-147
RAL 9005
CMYK 46-32-34-12
HEX EAD294
PANTONE 7543 C
TIKKURILA L 499`);
createNewColor(`90
серебристо-серый
RGB 111-114-116
RAL
CMYK 47-34-33-14
HEX 6F7275
PANTONE
TIKKURILA`);
createNewColor(`91
золотистый
RGB 121-101-50
RAL
CMYK 33-41-70-23
HEX 6F7275
PANTONE
TIKKURILA`);
createNewColor(`92
медный
RGB 105-64-30
RAL
CMYK 27-57-80-36
HEX 6F7275
PANTONE
TIKKURILA`);

// createNewColor(``);
// createNewColor(``);
// createNewColor(``);
// createNewColor(``);
// createNewColor(``);
// createNewColor(``);
// createNewColor(``);

// createColor(31, "красный", [, ,], 0, [, , ,], "", "");
// createColor(32, "светло-красный", [, ,], 0, [, , ,], "", "");
// createColor(47, "красно-оранжевый", [, ,], 0, [, , ,], "", "");
// createColor(34, "оранжевый", [, ,], 0, [, , ,], "", "");
// createColor(36, "светло-оранжевый", [, ,], 0, [, , ,], "", "");
// createColor(35, "пастельно-оранжевый", [, ,], 0, [, , ,], "", "");
// createColor(404, "пурпурный", [, ,], 0, [, , ,], "", "");
// createColor(40, "фиолетовый", [, ,], 0, [, , ,], "", "");
// createColor(43, "лавандовый", [, ,], 0, [, , ,], "", "");
// createColor(42, "сиреневый", [, ,], 0, [, , ,], "", "");
// createColor(41, "малиновый", [, ,], 0, [, , ,], "", "");
// createColor(45, "светло-розовый", [, ,], 0, [, , ,], "", "");
// createColor(562, "глубокое синее море", [, ,], 0, [, , ,], "", "");
// createColor(518, "стальной синий", [, ,], 0, [, , ,], "", "");
// createColor(50, "тёмно-синий", [, ,], 0, [, , ,], "", "");
// createColor(65, "кобальтовый синий", [, ,], 0, [, , ,], "", "");
// createColor(49, "королевский синий", [, ,], 0, [, , ,], "", "");
// createColor(86, "ярко-синий", [, ,], 0, [, , ,], "", "");
// createColor(67, "синий", [, ,], 0, [, , ,], "", "");
// createColor(57, "сине-голубой", [, ,], 0, [, , ,], "", "");
// createColor(51, "генцианово-голубой", [, ,], 0, [, , ,], "", "");
// createColor(98, "генциановый", [, ,], 0, [, , ,], "", "");
// createColor(52, "лазурный", [, ,], 0, [, , ,], "", "");
// createColor(84, "небесный", [, ,], 0, [, , ,], "", "");
// createColor(53, "светло-голубой", [, ,], 0, [, , ,], "", "");
// createColor(56, "ледяной голубой", [, ,], 0, [, , ,], "", "");
// createColor(66, "бирюзово-синий", [, ,], 0, [, , ,], "", "");
// createColor(54, "", [, ,], 0, [, , ,], "", "");
// createColor(55, "", [, ,], 0, [, , ,], "", "");
// createColor(60, "", [, ,], 0, [, , ,], "", "");
// createColor(613, "", [, ,], 0, [, , ,], "", "");
// createColor(61, "", [, ,], 0, [, , ,], "", "");
// createColor(68, "", [, ,], 0, [, , ,], "", "");
// createColor(62, "", [, ,], 0, [, , ,], "", "");
// createColor(64, "", [, ,], 0, [, , ,], "", "");
// createColor(63, "", [, ,], 0, [, , ,], "", "");
// createColor(800, "", [, ,], 0, [, , ,], "", "");
// createColor(83, "", [, ,], 0, [, , ,], "", "");
// createColor(81, "", [, ,], 0, [, , ,], "", "");
// createColor(82, "", [, ,], 0, [, , ,], "", "");
// createColor(23, "", [, ,], 0, [, , ,], "", "");
// createColor(70, "", [, ,], 0, [, , ,], "", "");
// createColor(73, "", [, ,], 0, [, , ,], "", "");
// createColor(71, "", [, ,], 0, [, , ,], "", "");
// createColor(76, "", [, ,], 0, [, , ,], "", "");
// createColor(74, "", [, ,], 0, [, , ,], "", "");
// createColor(72, "", [, ,], 0, [, , ,], "", "");
// createColor(90, "", [, ,], 0, [, , ,], "", "");
// createColor(91, "", [, ,], 0, [, , ,], "", "");
// createColor(92, "", [, ,], 0, [, , ,], "", "");

function createNewColor8500(text = "", palette = palette8500) {
  let [id, name, rgb, ral, cmyk] = text.split("\n");

  id = Number(id);

  rgb = rgb
    .replace("RGB", "")
    .trim()
    .split("-")
    .map((el) => Number(el));
  // rgb = rgb.map(el => Number(el));

  ral = Number(ral.replace("RAL", "").trim());
  ral = ral ? ral : null;

  cmyk = cmyk
    .replace("CMYK", "")
    .trim()
    .split("-")
    .map((el) => Number(el));

  palette.push({
    id: id,
    name: name,
    rgb: rgb,
    ral: ral,
    cmyk: cmyk,
    pantone: null,
    tikkurila: null,
  });
}

createNewColor8500(
  `10
белый
RGB 231-234-238
RAL 9003
CMYK 0-0-0-0
HEX E8EAEE`,
  palette8500
);
createNewColor8500(
  `25
серно-желтый
RGB 241-225-14
RAL 1016
CMYK 5-9-87-0
HEX F2E010`,
  palette8500
);
createNewColor8500(
  `21
желтый
RGB 254-198-0
RAL 1023
CMYK 0-28-95-0
HEX FFC808`,
  palette8500
);
createNewColor8500(
  `13
цинковый желтый
RGB 243-195-0
RAL
CMYK 5-16-100-0
HEX f4ce00`,
  palette8500
);
createNewColor8500(
  `20
золотисто-желтый
RGB 252-166-0
RAL 1033
CMYK 2-43-94-0
HEX FAA71A`,
  palette8500
);
createNewColor8500(
  `207
желтая охра
RGB 225-165-41
RAL
CMYK 12-36-98-0
HEX e1a529`,
  palette8500
);
createNewColor8500(
  `15
желто-оранжевый
RGB
RAL
CMYK 0-42-100-0
HEX FFA300`,
  palette8500
);
createNewColor8500(
  `34
оранжевый
RGB 224-84-0
RAL 2004
CMYK 7-85-100-1
HEX DF4A06`,
  palette8500
);
createNewColor8500(
  `330
красно-рыжий
RGB 200-36-17
RAL
CMYK 15-98-100-5
HEX C82411`,
  palette8500
);
createNewColor8500(
  `323
красно-коралловый
RGB 211-39-59
RAL
CMYK 11-98-81-2
HEX D3273B`,
  palette8500
);
createNewColor8500(
  `32
светло-красный
RGB 204-49-28
RAL 3020
CMYK 14-100-100-5
HEX C91100`,
  palette8500
);
createNewColor8500(
  `329
ярко-красный
RGB 195-5-14
RAL
CMYK 16-100-100-7
HEX C3050E`,
  palette8500
);
createNewColor8500(
  `16
красно-алый
RGB 207-17-10
RAL
CMYK 12-100-100-3
HEX CF110A`,
  palette8500
);
createNewColor8500(
  `31
красный
RGB 193-28-19
RAL 2002
CMYK 21-100-100-14
HEX B0000D`,
  palette8500
);
createNewColor8500(
  `17
вишнево-красный
RGB 165-0-14
RAL
CMYK 23-100-100-19
HEX A5000E`,
  palette8500
);
createNewColor8500(
  `30
темно-красный
RGB 119-0-23
RAL 3003
CMYK 27-100-100-28
HEX 77000E`,
  palette8500
);
createNewColor8500(
  `85
палево-розовый
RGB 223-142-143
RAL
CMYK 10-53-33-0
HEX DF8E8F`,
  palette8500
);
createNewColor8500(
  `413
бледно-розовый
RGB 211-97-177
RAL
CMYK 17-74-0-0
HEX D361B1`,
  palette8500
);
createNewColor8500(
  `4
малиновый
RGB 179-0-106
RAL
CMYK 21-96-35-1
HEX C22B6B`,
  palette8500
);
createNewColor8500(
  `8
бургунди
RGB 118-6-48
RAL
CMYK 33-100-66-40
HEX 760630`,
  palette8500
);
createNewColor8500(
  `40
фиолетовый
RGB 100-0-92
RAL
CMYK 73-96-29-16
HEX 5D2C68`,
  palette8500
);
createNewColor8500(
  `403
бледно-фиолетовый
RGB 93-34-135
RAL
CMYK 82-100-8-1
HEX 592C87`,
  palette8500
);
createNewColor8500(
  `12
лиловый
RGB 69-3-87
RAL
CMYK 80-100-28-33
HEX 450357`,
  palette8500
);
createNewColor8500(
  `527
пастельно-голубой
RGB 87-145-173
RAL
CMYK 68-33-22-1
HEX 5791AD`,
  palette8500
);
createNewColor8500(
  `53
голубой
RGB 0-145-173
RAL
CMYK 82-35-5-0
HEX 0089C3`,
  palette8500
);
createNewColor8500(
  `52
лазурный
RGB 0-98-183
RAL 5015
CMYK 94-68-1-0
HEX 005DAB`,
  palette8500
);
createNewColor8500(
  `51
генцианово-синий
RGB 0-89-172
RAL 5017
CMYK 100-81-21-6
HEX 0059AC`,
  palette8500
);
createNewColor8500(
  `528
серо-синий
RGB 0-101-157
RAL
CMYK 93-60-15-1
HEX 00659D`,
  palette8500
);
createNewColor8500(
  `5
средне-синий
RGB 5-57-162
RAL
CMYK 100-89-0-0
HEX 0539A2`,
  palette8500
);
createNewColor8500(
  `6
интенсивно-синий
RGB 0-45-117
RAL
CMYK 100-91-26-14
HEX 002D75`,
  palette8500
);
createNewColor8500(
  `49
королевский синий
RGB 36-4-123
RAL 5002
CMYK 100-95-23-11
HEX 152A78`,
  palette8500
);
createNewColor8500(
  `65
кобальтовый темно-синий
RGB 33-0-102
RAL 5022
CMYK 100-96-27-18
HEX 12226C`,
  palette8500
);
createNewColor8500(
  `7
глубокий синий
RGB 37-35-95
RAL
CMYK 100-99-32-23
HEX 25235F`,
  palette8500
);
createNewColor8500(
  `541
темно-бирюзовый
RGB 0-83-115
RAL
CMYK 96-64-36-17
HEX 005373`,
  palette8500
);
createNewColor8500(
  `66
бирюзово-синий
RGB 0-139-150
RAL
CMYK 86-33-41-6
HEX 00818C`,
  palette8500
);
createNewColor8500(
  `54
бирюзовый
RGB 0-172-146
RAL
CMYK 81-18-45-1
HEX 009B97`,
  palette8500
);
createNewColor8500(
  `62
светло-зеленый
RGB 0-153-53
RAL
CMYK 87-23-100-9
HEX 00873C`,
  palette8500
);
createNewColor8500(
  `63
липово-зеленый
RGB 74-182-0
RAL
CMYK 64-12-100-1
HEX 6AA72D`,
  palette8500
);
createNewColor8500(
  `9
средне-зеленый
RGB 0-157-104
RAL
CMYK 83-13-78-1
HEX 009D68`,
  palette8500
);
createNewColor8500(
  `62
ярко-зеленый
RGB 0-115-50
RAL
CMYK 90-30-100-32
HEX 007332`,
  palette8500
);
createNewColor8500(
  `618
сине-зеленый
RGB 0-63-66
RAL
CMYK 93-56-60-48
HEX 003F42`,
  palette8500
);
createNewColor8500(
  `68
травяной-зеленый
RGB 0-110-56
RAL
CMYK 89-27-96-15
HEX 007A42`,
  palette8500
);
createNewColor8500(
  `87
изумрудно-зеленый
RGB 0-120-50
RAL
CMYK 89-28-100-16
HEX 007832`,
  palette8500
);
createNewColor8500(
  `60
темно-зеленый
RGB 0-62-41
RAL 6005
CMYK 89-45-86-55
HEX 003E29`,
  palette8500
);
createNewColor8500(
  `70
черный
RGB 27-29-32
RAL
CMYK 75-68-64-83
HEX 0D0E11`,
  palette8500
);
createNewColor8500(
  `74
серый
RGB 135-143-143
RAL
CMYK 48-37-42-3
HEX 8A8F8B`,
  palette8500
);
createNewColor8500(
  `76
ярко-серый
RGB 155-161-167
RAL
CMYK 52-41-40-5
HEX 818689`,
  palette8500
);
createNewColor8500(
  `72
светло-серый
RGB 198-201-202
RAL
CMYK 25-18-21-0
HEX BFC2C0`,
  palette8500
);
createNewColor8500(
  `805
цвет слоновой кости
RGB 227-213-179
RAL
CMYK 11-13-31-0
HEX E3D5B3`,
  palette8500
);
createNewColor8500(
  `88
кофейно-коричневый
RGB 70-41-33
RAL
CMYK 49-72-73-63
HEX 462921`,
  palette8500
);
createNewColor8500(
  `81
светло-коричневый
RGB 180-137-89
RAL
CMYK 33-43-71-7
HEX A8885C`,
  palette8500
);
createNewColor8500(
  `11
бежево-коричневый
RGB 223-187-135
RAL
CMYK 13-26-52-0
HEX DFBB87`,
  palette8500
);
createNewColor8500(
  `90
серебристый
RGB 125-129-132
RAL
CMYK 23-17-16-0
HEX C3C5C9`,
  palette8500
);
createNewColor8500(
  `91
золотистый
RGB 144-127-68
RAL
CMYK 31-39-69-5
HEX AF9161`,
  palette8500
);

const arr = [];
for (let i = 1; i <= 35; i++) {
  arr.push({ id: i, name: "", path: "" });
}
console.log(arr);

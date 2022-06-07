// textSign: "",
// font: 1,
// textHeight: 0.1,
// signHeight: 1,
// signWidth: 1,
// mountHeight: 1,
// faceColor: 25,
// isFaceLight: true,
// sideColor: 25,
// isSideLight: false,
// backLight: "green",
// isHighBrightness: false,
const body = document.body;

export default function (props) {
  function initInputs() {
    const inputs = body.getElementsByTagName("input");
    inputs[0].name;

    for (let prop in props) {
      const inp = inputs.namedItem(prop);

      if (inp) {
        inp.value = props[prop];
      }
    }

    // for (inp of inputs) {
    //   props.
    //   inp.name;
    // }
  }

  initInputs();
}

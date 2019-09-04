const getLaunchPads = launchPadData => {
  let options = launchPadData.map(launchPad => {
    const { id, fullName } = launchPad;
    return { value: id, label: fullName };
  });

  return options;
};

export default getLaunchPads;

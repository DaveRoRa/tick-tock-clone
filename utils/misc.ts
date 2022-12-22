const today = new Date();

const arrayDateUnityMethod = [
  { single: "last year", unities: " years", method: Date.prototype.getFullYear },
  { single: "last month", unities: " months", method: Date.prototype.getMonth },
  { single: "1d ago", unities: "d", method: Date.prototype.getDate },
  { single: "1h ago", unities: "h", method: Date.prototype.getHours },
  { single: "1m ago", unities: "m", method: Date.prototype.getMinutes }
];

export const calculatePassedTime = (oldTimeString?: string) => {
  if (!oldTimeString) {
    return "";
  }
  const oldTime = new Date(oldTimeString);
  for (let { method, single, unities } of arrayDateUnityMethod) {
    const currentInUnity = method.apply(today);
    const oldInUnity = method.apply(oldTime);
    const textDiff = getDateDiffText(currentInUnity, oldInUnity, single, unities);
    if (textDiff) {
      return textDiff;
    }
  }
  return "a moment ago";
};

const getDateDiffText = (
  current: number,
  old: number,
  oneUnity: string,
  unity: string
) => {
  if (current !== old) {
    const diff = current - old;
    if (diff === 1) {
      return oneUnity;
    }
    return `${diff}${unity} ago`;
  }
  return "";
};

import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});
/*all the components and file can acsses to this amot by  
"const isDark = useRecoilValue(isDarkAtom)"*/
//useRecoilValue(atom's name) is get the value
// const setDarkAtom = useSetRecoilState(isDarkAtom); is set the value

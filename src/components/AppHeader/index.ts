import { Header, Span } from "../../libs/elements";
import { formatDate } from "../../utils/formatDate";

export const AppHeader = () => {
  return Header({
    children: [
      Span({
        children: [formatDate(new Date())],
      }),
    ],
  });
};

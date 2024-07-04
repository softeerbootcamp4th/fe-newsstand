import news0 from "@/mocks/data/news0.json";
import news1 from "@/mocks/data/news1.json";
import news2 from "@/mocks/data/news2.json";
import news3 from "@/mocks/data/news3.json";
import news4 from "@/mocks/data/news4.json";
import news5 from "@/mocks/data/news5.json";
import news6 from "@/mocks/data/news6.json";

export function getNews(category) {
  switch (category) {
    case 0:
      return news0;
    case 1:
      return news1;
    case 2:
      return news2;
    case 3:
      return news3;
    case 4:
      return news4;
    case 5:
      return news5;
    case 6:
      return news6;
    default:
      return news0;
  }
}

import { AutoRollingNews } from '../components/autoRollingNews/autoRollingNews.js';
import { SnackBar } from "../components/snackBar/snackBar.js";
import { Alert } from "../components/alert/alert.js";
import { CategoryButton } from '../views/categoryButton.js';
import { NewsList } from '../views/newsList.js';

export const componentRegistry = {
    'autoRollingNews': AutoRollingNews,
    'anackBar': SnackBar,
    'alert': Alert,
    'categoryButton': CategoryButton,
    'newsList': NewsList
};

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

export default dayjs;

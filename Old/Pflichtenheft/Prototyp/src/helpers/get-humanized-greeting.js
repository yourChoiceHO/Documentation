import { cond, gte, lt, always, T } from 'ramda';
import moment from 'moment';

const getHumanizedGreeting = (date) => {
  moment.locale('de');

  const fullHour = moment()
    .add(30, 'minutes')
    .startOf('hour')
    .format('H');

  const hour = parseInt(fullHour, 10);
  const offset = moment(date).isDST() ? 1 : 0;

  const getGreeting = cond([
    [h => gte(h, 6) && lt(h, 10), always('Guten Morgen')],
    [h => gte(h, 10) && lt(h, 12), always('Guten Vormittag')],
    [h => gte(h, 12) && lt(h, 14), always('Gute Mittag')],
    [h => gte(h, 14) && lt(h, 17), always('Guten Nachmittag')],
    [h => gte(h, 17) && lt(h, 21), always('Guten Abend')],
    [T, always('Gute Nacht')],
  ]);

  return getGreeting(hour + offset);
};

export default getHumanizedGreeting;

import { Level } from '../store/types';


const recordKey = (key: string) => key + '-record';


const SnakeLocalStorage = {
  getRecord(level: Level) {
    const record = localStorage.getItem(recordKey(level));
    const res = Number(record) || 0;

    return res;
  },

  setRecord(level: Level, record: number) {
    localStorage.setItem(
      recordKey(level),
      String(record)
    );
  },
}


export default SnakeLocalStorage;
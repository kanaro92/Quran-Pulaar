import { Subject } from 'rxjs';
const indexSubject = new Subject();

export const appService = {
    getIndexSubject: () => indexSubject.asObservable(),
    setIndexSubject(index: any){
        indexSubject.next(index)
    },
};


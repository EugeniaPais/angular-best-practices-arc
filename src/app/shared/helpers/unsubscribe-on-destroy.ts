import { OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

export class UnsubscribeOnDestroy implements OnDestroy {
    protected subs = new SubSink();

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}

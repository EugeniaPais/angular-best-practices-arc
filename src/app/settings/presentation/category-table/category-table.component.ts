import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Category } from '../../core/models/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTableComponent implements OnInit {
  @Input() categories$: Observable<Category[]>;
  constructor() { }

  ngOnInit() { }
}

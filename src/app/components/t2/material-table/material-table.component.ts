import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

// table and paginator
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';

// dialog for pop-up form
import { MatDialog} from '@angular/material/dialog';

import { PeriodicElement } from '../../../interfaces/periodic-element';
import { HttpConfigService } from 'src/app/services/http-config.service';
import { Observable } from 'rxjs';
import { EditElementComponent } from '../../t3/edit-element/edit-element.component';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit {

  /* In Angular 9, ViewChild() takes a single argument (instead of 2 as in Angular 8) of either component type (MatPaginator)
  or component name. The second argument, static, defaults to false, i.e. resolve after change detection.
  Here we use ViewChild to access paginator, so it can be attached to MatTableDataSource. */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatTable) table: MatTable<PeriodicElement>;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'modify'];
  periodicElements$: Observable<PeriodicElement[]>;
  periodicElements: PeriodicElement[];
  periodicElement: PeriodicElement;

  dataSource: MatTableDataSource<PeriodicElement>;

  constructor(
    private httpConfigService: HttpConfigService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
   // get remote data
    this.periodicElements$ = this.httpConfigService.getPeriodicElements();
    this.periodicElements$.subscribe(
      res => {
        this.periodicElements = [];
        for (const i of res) {
          this.periodicElements.push(new PeriodicElement(i.name, i.position, i.weight, i.symbol));
        }

        this.refresh();

        //  detect change in case source data are updated
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  //  Anytime table value changes, call this function to ensure that changes in data are reflected in table and paginator
  refresh() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.periodicElements);
    this.dataSource.paginator = this.paginator;
  }

  deleteElement(i: PeriodicElement): void {
    console.log(`${i.name} has been deleted.`);
    this.periodicElements.splice(this.periodicElements.indexOf(i), 1);
    this.refresh();
  }

  addElement(x: PeriodicElement): void {
    console.log(`A new element has been added.`);
    this.periodicElements.push(x);
    this.refresh();
  }

  // pop up add element dialog box
  addElementDialog(): void {
    const dialogRef = this.dialog.open(EditElementComponent, {
      height: '600px',
      width: '400px',
      data: {element: this.periodicElements}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed.');
      this.periodicElement = result;
      if (result) {
        this.addElement(result);
      }
    });
  }

}

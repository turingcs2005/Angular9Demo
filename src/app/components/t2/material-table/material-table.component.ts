import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

// table and paginator
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';

// dialog for pop-up form
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// import types
import { PeriodicElement } from '../../../interfaces/periodic-element';
import { Operation } from '../../../interfaces/miscellaneous';

import { HttpConfigService } from 'src/app/services/http-config.service';
import { Observable } from 'rxjs';
import { ModElementComponent } from '../../t3/mod-element/mod-element.component';
import { ConfirmDeleteComponent } from '../../t3/confirm-delete/confirm-delete.component';
import { SnackBarComponent } from '../../t4/snack-bar/snack-bar.component';


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
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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

  //  Anytime table changes (i.e. adding/deleting rows), call refresh() to ensure that changes are reflected in table and paginator
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

  updateElement(target: PeriodicElement, source: PeriodicElement): void {
    // Object.assign() copies only own (not parent class) enumerable properties. */
    Object.assign(target, source);
  }

  openDialog(operation: Operation, x: PeriodicElement = new PeriodicElement()) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;  // user click outside of dialog won't close the dialog box.
    dialogConfig.autoFocus = true;     // auto focus on the first form field
    dialogConfig.height = '600px';
    dialogConfig.width = '400px';

    // default to true, i.e. navigating to another route in our single page application closes the dialog. Set to false.
    dialogConfig.closeOnNavigation = false;

    /* Pass data to dialog. first property indicates type of operation (add vs. edit); second property passes an element.
       For add operation, an empty PeriodicElement is passed since adding new element doesn't need an existing one;
       For edit operation, the current PeriodicElement is passed to be edited and updated. */
    dialogConfig.data = {
      op: operation,
      element: x  // for add operation, we don't need x so it takes default value (empty PeriodicElement)
    };

    //  create a reference to dialog component
    const dialogRef = this.dialog.open(ModElementComponent, dialogConfig);

    // subscribe to observable returned by dialog
    dialogRef.afterClosed().subscribe(
      data => {
        console.log('The modify-element dialog was closed.');
        if (data) {  // if dialog component didn't return empty object
          if (data.op === Operation.Edit) {
            this.updateElement(x, data.element);
          } else if (data.op === Operation.Add) {
            this.addElement(data.element);
          } else {
            console.log('This component performs only add and edit. This should not happen');
          }
        }
      }
    );
  }

  openDialog2(x: PeriodicElement) {
    this.openSnackBar();  // send warning that an element is about to be deleted.
    const dialogConfig2 = new MatDialogConfig();

    dialogConfig2.disableClose = true;  // user click outside of dialog won't close the dialog box.
    dialogConfig2.autoFocus = true;     // auto focus on the first form field
    dialogConfig2.height = '200px';
    dialogConfig2.width = '400px';

    dialogConfig2.data = x;

    // default to true, i.e. navigating to another route in our single page application closes the dialog. Set to false.
    dialogConfig2.closeOnNavigation = false;

    //  create a reference to dialog component
    const dialogRef2 = this.dialog.open(ConfirmDeleteComponent, dialogConfig2);

    // subscribe to observable returned by dialog
    dialogRef2.afterClosed().subscribe(
      data => {
        if (data) {
          this.deleteElement(x);
        }
      }
    );
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000  // 5 seconds duration for snackbar
    });
  }
}

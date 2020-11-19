import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StatusService } from 'src/app/services/status/status.service';
import { convertToCSV } from '../../../utils/generateCSV';
import { MatDialog } from '@angular/material/dialog';

import { addDays } from '@progress/kendo-date-math';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

export interface StatusData {
  date: string;
  batch_id: string;
  submittedEnv: string;
  collectedEnv: string;
  status: string;

}

@Component({
  selector: 'app-viewstatus',
  templateUrl: './viewstatus.component.html',
  styleUrls: ['./viewstatus.component.css']
})
export class ViewstatusComponent implements OnInit {

  error = false;
  checked = false;
  AlldataStatus: Array<StatusData>;
  @ViewChild('TABLE') table: ElementRef;

  public range = { start: null, end: null };

  _loading = true;
  
  displayedStatusColumns: string[] = [
    'date',
    'batch_id',
    'submittedEnv',
    'collectedEnv',
    'status',

  ];

  // FILTERS


  allSubmissionsStatus: Array<StatusData>;

  dataSourceStatus: MatTableDataSource<StatusData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private statusService: StatusService, private router: Router ) {}


  
  ngOnInit() {
    this.statusService.getStatus().subscribe(
      (dataStatus: Array<StatusData>) => {
        this.AlldataStatus = dataStatus;

        this.allSubmissionsStatus = dataStatus;
        this.dataSourceStatus = new MatTableDataSource(
          dataStatus.map((d) => {
            return {
              ...d,
              
            };
          })
        );
        console.log(dataStatus);

        //this.source = new LocalDataSource(this.data);
        // setTimeout(() => {this._loading=false},2000)
        this.dataSourceStatus.paginator = this.paginator;
        this.dataSourceStatus.sort = this.sort;
      },
      (err) => console.log(err)
    );

  }
  goback() {
    this.router.navigate(['/hr']);
  }
  goMessenger() {
    this.router.navigate(['/messenger']);
  }

  
  
  ChangeViewDateFormat(d: Date): any {
    const d2: Date = new Date(d);
    const dd = String(d2.getDate()).padStart(2, '0');
    const mm = String(d2.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = d2.getFullYear();

    return dd + '-' + mm + '-' + yyyy;
  }

  

}

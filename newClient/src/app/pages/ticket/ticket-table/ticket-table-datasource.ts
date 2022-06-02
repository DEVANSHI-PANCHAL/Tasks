import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


// TODO: Replace this with your own data model type
export interface TicketTableItem {
  status: boolean;
  createdBy: string;
  description: string;
  createdAt: number;
  actions:[string,string];
  
}

// TODO: replace this with real data from your application
export const EXAMPLE_DATA: TicketTableItem[] = [
  {status:false, createdBy: 'Hydrogen',description: 'desc1',createdAt:1,actions:["edit","delete"]},
  {status:true, createdBy: 'Helium',description: 'desc2',createdAt:1,actions:["edit","delete"]},
  {status:false, createdBy: 'Lithium',description: 'desc3',createdAt:1,actions:["edit","delete"]},
  {status:true, createdBy: 'Beryllium',description: 'desc4',createdAt:1,actions:["edit","delete"]},
  {status:true, createdBy: 'Boron',description: 'desc5',createdAt:1,actions:["edit","delete"]},
  {status:false, createdBy: 'Hydrogen',description: 'desc1',createdAt:1,actions:["edit","delete"]},
  {status:false, createdBy: 'Hydrogen',description: 'desc1',createdAt:1,actions:["edit","delete"]},
  {status:false, createdBy: 'Hydrogen',description: 'desc1',createdAt:1,actions:["edit","delete"]},
   
];

/**
 * Data source for the TicketTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TicketTableDataSource extends DataSource<TicketTableItem> {
  data: TicketTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TicketTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TicketTableItem[]): TicketTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TicketTableItem[]): TicketTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.createdBy, b.createdBy, isAsc);
        // case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

import { Component, OnInit<% if(ui.toString() === 'material'){ %>, ViewChild<% } %> } from '@angular/core';<% if(ui.toString() === 'material'){ %>
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';<% } %>
import {ActivatedRoute} from '@angular/router';

import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';

@Component({
  templateUrl: './<%= dasherize(pluralize(name)) %>.list.component.html',
  styleUrls: ['./<%= dasherize(pluralize(name)) %>.list.component.<%= styleext %>']
})
/**
 * List view.
 */
export class <%= classify(pluralize(name)) %>ListComponent implements OnInit {

  /**
   * View bound variable.
   */<% if(ui.toString() === 'material'){ %>
   list: MatTableDataSource<<%= classify(singularize(vo)) %>>;

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

  /**
   * Columns to display in the UI.
   */
  columnsToDisplay: string[] = [<% parameters.forEach(function(parameter){ %>'<%= parameter %>', <% }) %> 'action'];
<% } else %>
    list: <%= classify(singularize(vo)) %>[];
<% } %>
  /**
   * Component constructor and DI injection point.
   * @param {ActivatedRoute} route
   */
  constructor(private route: ActivatedRoute) { }

  /**
   * Called part of the component lifecycle. Best first
   * place to start adding your code.
   */
  ngOnInit() {<% if(ui.toString() === 'material'){ %>
    this.list = new MatTableDataSource(this.route.snapshot.data['<%= camelize(pluralize(vo)) %>']);
    this.list.paginator = this.paginator;
    this.list.sort = this.sort;<% } else { %>
    this.list = this.route.snapshot.data['<%= camelize(pluralize(vo)) %>'];<% } %>
  }<% if(ui.toString() === 'material'){ %>

  applyFilter(filterValue: string) {
    this.list.filter = filterValue.trim().toLowerCase();

    if (this.list.paginator) {
        this.list.paginator.firstPage();
    }
  }<% } %>

}

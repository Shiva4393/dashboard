import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import * as _ from "lodash";

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss']
})
export class UserPermissionsComponent implements OnInit {

  @Input() permission;

  ngOnInit() {
  }

  check(item, option): void {
    if (item.type === 'check') {
      item.permission = _.indexOf(item.permission, 1) > -1 ? [] : [1]
      item.check = _.indexOf(item.permission, 1) > -1 ? true : false;
    }
    else if (item.type === 'select' || item.type === 'radio') {
      item.permission = [option];
      item.selectedValue = option;
    }
    if (item.children) {
      this.checkChild(item.children, item)
    }
  }

  checkChild(data, parent): void {
    data.map(child => {
      if (parent.type === 'check') {
        child.checked = parent.checked;
        child.selectedValue = parent.checked === true ? 1 : 3;
        child.permission = parent.checked === true ? [1] : [];
      } else if (parent.type === 'select' || parent.type === 'radio') {
        child.checked = parent.selectedValue === 1 ? true : false;
        child.selectedValue = parent.selectedValue;
        child.permission = parent.selectedValue === 3 ? [3] : [1];
      }
      if (data.children) {
        this.checkChild(child.children, child);
      }
    })
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ComplianceFile } from './../../models/compliance-file';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  @Input() files: ComplianceFile[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

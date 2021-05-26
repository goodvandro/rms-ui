import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/error/error.service';
import { AuditFile } from 'src/app/models/audit-file';
import { AuditFileService } from './../audit-file.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  @Input() files: AuditFile[] = [];

  display: boolean = false;

  auditId = this.route.snapshot.params.id;
  description: string;
  file: any;

  constructor(
    private auditFileService: AuditFileService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }
  }

  create(form: NgForm): void {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('description', this.description);
    formData.append('idAudit', this.auditId);

    this.auditFileService.create(formData)
      .then((result) => {
        this.files.push(result);
        this.display = false;
        form.reset();
        this.toastr.success('Anexo adicionado!');
      })
      .catch((error) => this.errorService.handle(error))
  }
}
